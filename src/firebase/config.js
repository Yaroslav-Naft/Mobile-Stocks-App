import * as firebase from "firebase"
import "@firebase/auth"
import "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC3I_DJeSe6xdJZEjztYgvCAg9HRA3Cha4",
  authDomain: "game-stock-expo.firebaseapp.com",
  projectId: "game-stock-expo",
  storageBucket: "game-stock-expo.appspot.com",
  messagingSenderId: "313042627457",
  appId: "1:313042627457:web:5e4886ab9f47e19614d680",
}

export const signOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (e) {
    alert(e)
  }
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
