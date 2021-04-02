import React, { useState, useEffect, useContext } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StyleSheet, ActivityIndicator, Button } from "react-native"
import LoginScreenNavigator from "./src/components/navigation/LoginScreenNavigator"
import BottomTabNavigator from "./src/components/navigation/BottomTabNavigator"
import { firebase } from "./src/firebase/config"

import MainPageLoginNavigator from "./src/components/navigation/MainPageLoginNavigator"
import { AuthContext, AuthProvider } from "./src/context/AuthProvider"

const Stack = createStackNavigator()
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userRef = firebase.firestore().collection("users")
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        userRef
          .doc(currentUser.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((e) => {
            setLoading(true)
            setUser(null)
          })
      } else {
        setLoading(true)
        setUser(null)
      }
    })
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
              {(props) => <BottomTabNavigator {...props} user={user} />}
            </Stack.Screen>
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
