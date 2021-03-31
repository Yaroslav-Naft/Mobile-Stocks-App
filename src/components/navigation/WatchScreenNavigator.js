import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import WatchScreen from "../../screens/WatchScreen"
import { Button } from "react-native"
import { signOut } from "../../firebase/config"

const WatchScreenStack = createStackNavigator()
function WatchScreenNavigator() {
  return (
    <WatchScreenStack.Navigator>
      <WatchScreenStack.Screen
        name="Watch"
        component={WatchScreen}
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
    </WatchScreenStack.Navigator>
  )
}

export default WatchScreenNavigator
