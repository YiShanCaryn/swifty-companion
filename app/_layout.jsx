import { Stack } from "expo-router"
import { Colors } from "../constants/Colors"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <>
      <StatusBar value="auto" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: Colors.light.navBackground },
        headerTintColor: Colors.light.title,
      }}>
        {/* Individual Screens */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="profile" options={{ title: "Student Profile" }} />
      </Stack>
    </>
  )
}