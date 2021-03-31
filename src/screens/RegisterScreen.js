import React, { useState } from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { firebase } from "../firebase/config"

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const registerUser = async (email, password) => {
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      const userId = res.user.uid
      // store the user in Firestore
      const data = {
        id: userId,
        email,
      }
      const useRef = await firebase.firestore().collection("users")
      await useRef.doc(userId).set(data)
      navigation.navigate("Home", { user: data })
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
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="password"
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setConfirmPassword(password)}
        value={confirmPassword}
        placeholder="Confirm Password"
      />
      <Button title="Register" onPress={() => registerUser(email, password)} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login")
        }}
      >
        <Text>Already have an account?</Text>
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

export default RegisterScreen
