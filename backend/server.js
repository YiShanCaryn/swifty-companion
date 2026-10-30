const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

const app = express()
const PORT = 3000
let cachedAccessToken = null
let tokenExpiresAt = 0
let tokenRequest = null

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') 
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') 

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next()
})

const getAccessToken = async () => {
    const now = Date.now()

    if (cachedAccessToken && tokenExpiresAt > now + 60_000) {
        console.log('✅ Using cached token')
        return cachedAccessToken
    }
    console.log('🔄 Fetching new token...')

    if (!process.env.FORTYTWO_CLIENT_ID || !process.env.FORTYTWO_CLIENT_SECRET) {
        const error = new Error('API credentials are missing')
        error.code = 'MISSING_CREDENTIALS'
        throw error
    }

    if (!tokenRequest) {
        tokenRequest = axios.post(
            'https://api.intra.42.fr/oauth/token',
            {
                grant_type: 'client_credentials',
                client_id: process.env.FORTYTWO_CLIENT_ID,
                client_secret: process.env.FORTYTWO_CLIENT_SECRET
            }
        ).then((response) => {
            cachedAccessToken = response.data.access_token
            tokenExpiresAt = Date.now() + (response.data.expires_in * 1000)
            return cachedAccessToken
        }).finally(() => {
            tokenRequest = null
        })
    }
    return tokenRequest
}

app.get('/api/students/:login/image', async (req, res) => {
    try {
        const login = req.params.login.trim()
        const accessToken = await getAccessToken()
        const studentResponse = await axios.get(
            `https://api.intra.42.fr/v2/users/${encodeURIComponent(login)}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const imageUrl = studentResponse.data.image?.versions?.medium || studentResponse.data.image?.link

        if (!imageUrl) {
            return res.sendStatus(404)
        }

        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            headers: { Authorization: `Bearer ${accessToken}` }
        })

        res.set('Cross-Origin-Resource-Policy', 'cross-origin')
        res.type(imageResponse.headers['content-type'] || 'image/jpeg').send(imageResponse.data)
    } catch (error) {
        console.error('Student image error:', error.response?.status || error.message)
        res.sendStatus(error.response?.status === 404 ? 404 : 502)
    }
})

app.get('/api/students/:login', async (req, res) => {
    try {
        const login = req.params.login.trim()
        if (!login) {
            return res.status(400).json({
                code: 'INVALID_LOGIN',
                message: 'A student login is required.'
            })
        }

        const accessToken = await getAccessToken()

        const studentResponse = await axios.get(
            `https://api.intra.42.fr/v2/users/${encodeURIComponent(login)}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        const student = studentResponse.data

        res.json({
            login: student.login,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            image: student.image?.versions?.medium || student.image?.link || null,
            location: student.location,
            wallet: student.wallet,
            correction_point: student.correction_point,
            cursus_users: student.cursus_users,
            projects_users: student.projects_users || []
        })
    } catch (error) {
        console.error(
            'Student API error:',
            error.response?.status,
            error.response?.data?.error || 'Request failed'
        )

        if (error.response?.status === 404) {
            return res.status(404).json({
                code: 'LOGIN_NOT_FOUND',
                message: `No student was found for login "${req.params.login}".`
            })
        }

        if (error.code === 'MISSING_CREDENTIALS') {
            return res.status(500).json({
                code: error.code,
                message: error.message
            })
        }

        if (!error.response) {
            return res.status(503).json({
                code: 'UPSTREAM_UNAVAILABLE',
                message: 'The 42 API is unavailable. Please try again later.'
            })
        }

        res.status(502).json({
            code: 'UPSTREAM_REQUEST_FAILED',
            message: 'The 42 API request failed. Please try again later.'
        })
    }
})

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})