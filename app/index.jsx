import { StyleSheet, Text, View, Image, TextInput, 
    Pressable, ScrollView} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'

import Logo from '../assets/img/42.png'

const Home = () => {  
  
    const [login, setLogin] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSearch = () => {
        const studentLogin = login.trim()
        if (studentLogin === '') {
            setError('A student login is required.')
            return
        }
        setError('')
        setLogin('')
        router.push({
            pathname: '/profile',
            params: { login: studentLogin }
        })
    }

  return (
    <View style={styles.container}>
        <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled">

            <Image source={Logo} style={styles.img} resizeMode="contain"/>

            <Text style={styles.title}>
                SWIFTY COMPANION
            </Text>

            <Text style={styles.subtitle}>
                Find a 42 Student
            </Text>

            <View style={styles.searchContainer}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    <TextInput
                        style={[styles.input, error ? styles.inputError : null]}
                        placeholder="Enter a 42 login"
                        placeholderTextColor="#888"
                        value={login}
                        onChangeText={setLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        accessibilityLabel="42 student login"
                    />

                    <Pressable
                        style={styles.searchButton}
                        onPress={handleSearch}
                        accessibilityRole="button"
                    >
                        <Text style={styles.buttonText}>
                            Search
                        </Text>
                    </Pressable>
                </View>

            <Text style={styles.description}>
                Enter a student's 42 login to view their profile.
            </Text>

            <Link href="https://42lausanne.ch/fr" style={styles.link}>
                42 Website
            </Link>

        </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 100,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 8,
        textAlign: 'center'
    },
    inputError: {
        borderColor: 'red'
    },

    img: {
        width: 100,
        height: 100,
        marginBottom: 20
    },

    title: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 12
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 24
    },

    searchContainer: {
        width: '100%',
        maxWidth: 400
    },

    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12
    },

    searchButton: {
        height: 48,
        backgroundColor: '#00BABC',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    description: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        marginTop: 16
    },

    link: {
        marginTop: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#000000'
    }
})