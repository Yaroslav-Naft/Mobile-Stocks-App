import { useGestureHandlerRef } from "@react-navigation/stack"
import React, { useState, useContext } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { firebase } from "../firebase/config"
import { AuthContext } from "../context/AuthProvider"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { user, setUser } = useContext(AuthContext)

  const loginUser = async (email, password) => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      const userId = res.user.uid
      const userRef = firebase.firestore().collection("users")
      const document = await userRef.doc(userId).get()
      if (!document.exists) {
        alert("User doesn't exist")
        return
      }
      const currentUser = document.data()
      setUser(currentUser)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="password"
        keyboardType="numeric"
      />
      <Button title="Login" onPress={() => loginUser(email, password)} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register")
        }}
      >
        <Text>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
})

export default LoginScreen
