import { useGestureHandlerRef } from "@react-navigation/stack"
import React, { useState, useContext } from "react"
import { View, Text, StyleSheet, Button, Image } from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { View, TextInput, StyleSheet, Keyboard,  TouchableWithoutFeedback } from 'react-native';
import { firebase } from "../firebase/config"
import "../../assets/Logo.png"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> {children}
    </TouchableWithoutFeedback>
    );



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
    } catch (e) {
      alert(e)
    }
  }

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/Logo.png")} />

      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="email"
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={() => loginUser(email, password)} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register")
        }}
      >
        <Text>Create an Account</Text>
      </TouchableOpacity>
    </View>
    </DismissKeyboard>
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
    marginBottom: 150,
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

export default LoginScreen
