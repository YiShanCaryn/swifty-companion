import { View, Text, ActivityIndicator, Platform, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Constants from 'expo-constants'
import { Theme } from '../constants/Theme'

import ProfileHeader from '../components/profile/ProfileHeader'
import StudentOverview from '../components/profile/StudentOverview'
import SkillsSection from '../components/profile/SkillsSection'
import ProjectsSection from '../components/profile/ProjectsSection'

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
                projects: data.projects_users || [],
                evaluations: data.correction_point || 0
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
    <ScrollView
      style={Theme.styles.profileScrollView}
      contentContainerStyle={Theme.styles.profileContainer}
    >
      <ProfileHeader
        student={student}
        imageUri={`${getApiBaseUrl()}/api/students/${encodeURIComponent(login.trim())}/image`}
      />
      <StudentOverview student={student} />
      <SkillsSection skills={student.skills} />
      <ProjectsSection projects={student.projects} />
    </ScrollView>
  )
}

export default Profile
