import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import UserScreen from "../../screens/UserScreen"
import { Button } from "react-native"
import { signOut } from "../../firebase/config"

const UserScreenStack = createStackNavigator()
function UserScreenNavigator() {
  return (
    <UserScreenStack.Navigator>
      <UserScreenStack.Screen
        name="User"
        component={UserScreen}
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
    </UserScreenStack.Navigator>
  )
}

export default UserScreenNavigator
