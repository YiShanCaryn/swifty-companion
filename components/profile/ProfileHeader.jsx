import { Image, Text, View } from 'react-native'
import { useState } from 'react'
import { Theme } from '../../constants/Theme'

const ProfileHeader = ({ student, imageUri }) => {
  const [imageError, setImageError] = useState(false)
  const initials = `${student.first_name?.[0] || ''}${student.last_name?.[0] || ''}`

  return (
    <>
      {imageError ? (
        <View style={Theme.styles.avatarFallback}>
          <Text style={Theme.styles.avatarFallbackText}>{initials}</Text>
        </View>
      ) : (
        <Image
          source={{ uri: imageUri }}
          style={Theme.styles.avatar}
          onError={() => setImageError(true)}
        />
      )}
      <Text style={Theme.styles.profileTitle}>
        {student.first_name} {student.last_name}
      </Text>
    </>
  )
}

export default ProfileHeader