import { Stack } from "expo-router"
import { Colors } from "../constants/Colors"

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: Colors.light.navBackground },
        headerTintColor: Colors.light.title,
      }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="profile" options={{ title: "Student Profile" }} />
      </Stack>
    </>
  )
}