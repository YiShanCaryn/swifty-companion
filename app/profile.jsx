import { View, Text, Image, ActivityIndicator, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Constants from 'expo-constants'
import { Theme } from '../constants/Theme'
import Logo from '../assets/img/42.png'

const getApiBaseUrl = () => {
    if (Platform.OS === 'web') {
        return 'http://localhost:3000'
    }

    const hostUri = Constants.expoConfig?.hostUri
    const host = hostUri?.split(':')[0]

    return `http://${host || 'localhost'}:3000`
}

const Profile = () => {

  const { login } = useLocalSearchParams()

  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
      const fetchStudent = async () => {
          if (!login || Array.isArray(login)) {
              setError('Please provide a valid student login.')
              setLoading(false)
              return
          }

          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(), 10000)

          try {
              setLoading(true)
              setError('')
              setStudent(null)
              setImageFailed(false)

              const response = await fetch(
                  `${getApiBaseUrl()}/api/students/${encodeURIComponent(login.trim())}`,
                  { signal: controller.signal }
              )

              if (!response.ok) {
                  const body = await response.json().catch(() => ({}))
                  throw new Error(body.message || `Request failed (${response.status}).`)
              }

              const data = await response.json()
              
              // Extract the main cursus (42cursus, cursus_id: 21) or first with skills
              const mainCursus = data.cursus_users?.find(c => c.cursus_id === 21) ||
                                 data.cursus_users?.find(c => c.skills && c.skills.length > 0) ||
                                 data.cursus_users?.[0]
              
              // Transform skills to include percentage
              const skills = (mainCursus?.skills || []).map(skill => ({
                name: skill.name,
                level: skill.level,
                percentage: Math.min(100, Math.round(skill.level * 10))
              }))
              
              // Transform the API response to match our component expectations
              const transformedData = {
                ...data,
                level: mainCursus?.level || data.level,
                skills: skills,
                evaluations: data.correction_point || 0,
                phone: data.phone === 'hidden' ? null : data.phone,
                mobile: data.phone === 'hidden' ? null : data.phone
              }
              
              setStudent(transformedData)
          } catch (err) {
              if (err.name === 'AbortError') {
                  setError('The request timed out. Check the backend and try again.')
              } else if (err instanceof TypeError) {
                  setError('Unable to reach the backend. Check that it is running and accessible.')
              } else {
                  setError(err.message || 'Something went wrong.')
              }
          } finally {
              clearTimeout(timeout)
              setLoading(false)
          }
      }
      fetchStudent()
  }, [login])

  if (loading) {
    return (
        <View style={Theme.styles.profileContainer}>
            <ActivityIndicator size="large" />
            <Text>Loading student profile...</Text>
        </View>
      ) 
  }
  if (error) {
    return (
        <View style={Theme.styles.profileContainer}>
            <Text style={Theme.styles.profileError}>{error}</Text>
        </View>
      )
  }
  
  return (
    <View style={Theme.styles.profileContainer}>
      <Image
        source={
          imageFailed || !student.image
            ? Logo
            : { uri: `${getApiBaseUrl()}/api/students/${encodeURIComponent(login.trim())}/image` }
        }
        style={Theme.styles.avatar}
        onError={() => setImageFailed(true)}
      />

      <Text style={Theme.styles.profileTitle}>
        {student.first_name} {student.last_name}
      </Text>

      <View style={Theme.styles.profileDetails}>
        <Text style={Theme.styles.profileLogin}>Login: {student.login}</Text>
        <Text style={Theme.styles.profileInfo}>Email: {student.email || 'Not available'}</Text>
        <Text style={Theme.styles.profileInfo}>Mobile: {student.phone || student.mobile || 'Not available'}</Text>
        <Text style={Theme.styles.profileInfo}>Level: {student.level || 'Not available'}</Text>
        <Text style={Theme.styles.profileInfo}>Location: {student.location || 'Unavailable'}</Text>
        <Text style={Theme.styles.profileInfo}>Wallet: {student.wallet}</Text>
        <Text style={Theme.styles.profileInfo}>Evaluations: {student.evaluations || student.correction_point || 0}</Text>
      </View>

      {student.skills && student.skills.length > 0 && (
        <View style={Theme.styles.skillsSection}>
          <Text style={Theme.styles.skillsTitle}>Skills</Text>
          {student.skills.map((skill, index) => (
            <View key={index} style={Theme.styles.skillItem}>
              <Text style={Theme.styles.skillName}>{skill.name}</Text>
              <View style={Theme.styles.skillBarContainer}>
                <View style={[Theme.styles.skillBar, { width: `${skill.percentage || 0}%` }]} />
                <Text style={Theme.styles.skillText}>
                  Level {skill.level} - {skill.percentage || 0}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default Profile
