import { View, Text } from 'react-native'
import { Theme } from '../../constants/Theme'

const StudentOverview = ({ student }) => (
  <View style={Theme.styles.profileDetails}>
    <Text style={Theme.styles.profileLogin}>Login: {student.login}</Text>
    <Text style={Theme.styles.profileInfo}>Email: {student.email || 'Not available'}</Text>
    <Text style={Theme.styles.profileInfo}>Mobile: {student.phone || student.mobile || 'Not available'}</Text>
    <Text style={Theme.styles.profileInfo}>Level: {student.level || 'Not available'}</Text>
    <Text style={Theme.styles.profileInfo}>Location: {student.location || 'Unavailable'}</Text>
    <Text style={Theme.styles.profileInfo}>Wallet: {student.wallet}</Text>
    <Text style={Theme.styles.profileInfo}>Evaluations: {student.evaluations || student.correction_point || 0}</Text>
  </View>
)

export default StudentOverview