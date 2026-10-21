import { StyleSheet, View, Text} from 'react-native'
import { Link } from 'expo-router'


const Profile = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>

      {/*<Link href="/" style={styles.link}>Back</Link>*/}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize : 18,
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    }
})