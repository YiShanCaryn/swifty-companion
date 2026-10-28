import { StyleSheet, View, Text, Image, ActivityIndicator, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Constants from 'expo-constants'

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
              setStudent(data)
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
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text>Loading student profile...</Text>
        </View>
      ) 
  }
  if (error) {
    return (
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
        </View>
      )
  }
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: student.image || 'https://via.placeholder.com/120' }}
        style={styles.avatar}
      />

      <Text style={styles.title}>
        {student.first_name} {student.last_name}
      </Text>

      <View style={styles.details}>
        <Text style={styles.login}>Login: {student.login}</Text>
        <Text style={styles.info}>Email: {student.email || 'Not available'}</Text>
        <Text style={styles.info}>Mobile: {student.phone || student.mobile || 'Not available'}</Text>
        <Text style={styles.info}>Level: {student.level || 'Not available'}</Text>
        <Text style={styles.info}>Location: {student.location || 'Unavailable'}</Text>
        <Text style={styles.info}>Wallet: {student.wallet}</Text>
        <Text style={styles.info}>Evaluations: {student.evaluations || student.correction_point || 0}</Text>
      </View>

      {student.skills && student.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {student.skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <View style={styles.skillBarContainer}>
                <View style={[styles.skillBar, { width: `${skill.percentage || 0}%` }]} />
                <Text style={styles.skillText}>
                  Level {skill.level} - {skill.percentage || 0}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {student.projects && student.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {student.projects.map((project, index) => (
            <View key={index} style={[styles.projectItem, project.status === 'failed' && styles.failedProject]}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectStatus}>
                Status: {project.status || 'Completed'}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 60
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center'
  },

  details: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24
  },

  login: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center'
  },

  info: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center'
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#ddd'
  },

  error: {
    color: 'red',
    textAlign: 'center'
  },

  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center'
  },

  skillItem: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 12
  },

  skillName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center'
  },

  skillBarContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
    alignItems: 'center'
  },

  skillBar: {
    height: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 6
  },

  skillText: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
    textAlign: 'center'
  },

  projectItem: {
    width: '90%',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center'
  },

  failedProject: {
    backgroundColor: '#ffebee'
  },

  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center'
  },

  projectStatus: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  }
})