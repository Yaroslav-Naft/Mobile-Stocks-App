import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import WatchScreen from "../../screens/WatchScreen"
import DetailScreen from "../../screens/DetailScreen"
import { Button } from "react-native"
import { signOut } from "../../firebase/config"

const WatchScreenStack = createStackNavigator()
function WatchScreenNavigator({user}) {
  return (
    <WatchScreenStack.Navigator>
      <WatchScreenStack.Screen
        name="Watch"
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
      >
      {(props) => <WatchScreen {...props} user={user} />}
      </WatchScreenStack.Screen>
      <WatchScreenStack.Screen
        name="Detail"
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
      >
        {(props) => <DetailScreen {...props} user={user} />}
      </WatchScreenStack.Screen>
    </WatchScreenStack.Navigator>
  )
}

export default WatchScreenNavigator
