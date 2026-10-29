import { Text, View, Image, TextInput, 
    Pressable, ScrollView} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'

import Logo from '../assets/img/42.png'
import { Theme } from '../constants/Theme'

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
    <View style={Theme.styles.homeContainer}>
        <ScrollView
        contentContainerStyle={Theme.styles.homeContent}
        keyboardShouldPersistTaps="handled">

            <Image source={Logo} style={Theme.styles.homeLogo} resizeMode="contain"/>

            <Text style={Theme.styles.homeTitle}>
                SWIFTY COMPANION
            </Text>

            <Text style={Theme.styles.homeSubtitle}>
                Find a 42 Student
            </Text>

            <View style={Theme.styles.searchContainer}>
                {error ? <Text style={Theme.styles.homeErrorText}>{error}</Text> : null}
                    <TextInput
                        style={[Theme.styles.searchInput, error ? Theme.styles.homeInputError : null]}
                        placeholder="Enter a 42 login"
                        placeholderTextColor={Theme.colors.placeholder}
                        value={login}
                        onChangeText={setLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        accessibilityLabel="42 student login"
                    />

                    <Pressable
                        style={Theme.styles.searchButton}
                        onPress={handleSearch}
                        accessibilityRole="button"
                    >
                        <Text style={Theme.styles.searchButtonText}>
                            Search
                        </Text>
                    </Pressable>
                </View>

            <Text style={Theme.styles.homeDescription}>
                Enter a student's 42 login to view their profile.
            </Text>

            <Link href="https://42lausanne.ch/fr" style={Theme.styles.homeLink}>
                42 Website
            </Link>

        </ScrollView>
    </View>
  )
}

export default Home
