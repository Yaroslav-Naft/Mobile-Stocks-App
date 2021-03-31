import React, { useState } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import LoginScreenNavigator from "./src/components/navigation/LoginScreenNavigator"
import BottomTabNavigator from "./src/components/navigation/BottomTabNavigator"
import MainPageLoginNavigator from "./src/components/navigation/MainPageLoginNavigator"
// import { AuthProvider } from "./src/context/AuthProvider"

const Stack = createStackNavigator()
export default function App() {
  const [user, setUser] = useState(null)

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={LoginScreenNavigator} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
