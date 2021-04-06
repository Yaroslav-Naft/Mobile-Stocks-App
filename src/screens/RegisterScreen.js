import React, { useState } from "react"
import { View, Text, StyleSheet, Button, Image } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { firebase } from "../firebase/config"
import "../../assets/Logo.png"
import { KeyboardHide } from "../components/misc/KeyboardHide"

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

      const portfolio = {
        userId: userId,
        stocks: [],
        cash: 50000,
      }
      const portfolioRef = firebase.firestore().collection("portfolio")
      await portfolioRef.doc(userId).set(portfolio)

      // navigation.navigate("Home", { user: data })
    } catch (e) {
      alert(e)
    }
  }

  return (
  <KeyboardHide>
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />
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
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setConfirmPassword(password)}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={true}
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
  </KeyboardHide> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    backgroundColor: "white",
  },

  logo: {
    height: 150,
    width: 270,
    marginBottom: 100,
  },

  input: {
    height: 60,
    width: 400,
    backgroundColor: "#D9D9D9",
    margin: 20,
    borderRadius: 10,
    fontSize: 20,
    padding: 20,
  },
})

export default RegisterScreen
