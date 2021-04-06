import React from "react"
import { Button } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../../screens/HomeScreen"
import DetailScreen from "../../screens/DetailScreen"
import { signOut } from "../../firebase/config"

const HomeScreenStack = createStackNavigator()
function HomeScreenNavigator({ user }) {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                signOut()
              }}
              title="Logout"
              color="#000"
            />
          ),
        }}
      />
      <HomeScreenStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                signOut()
              }}
              title="Logout"
              color="#000"
            />
          ),
        }}
      />
    </HomeScreenStack.Navigator>
  )
}

export default HomeScreenNavigator
