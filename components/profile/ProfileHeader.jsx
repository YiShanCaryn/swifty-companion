import { Image, Text } from 'react-native'
import { Theme } from '../../constants/Theme'

const ProfileHeader = ({ student, imageUri }) => (
  <>
    <Image source={{ uri: imageUri }} style={Theme.styles.avatar} />
    <Text style={Theme.styles.profileTitle}>
      {student.first_name} {student.last_name}
    </Text>
  </>
)

export default ProfileHeader