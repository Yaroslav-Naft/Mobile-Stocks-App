import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TradingScreen from "../../screens/TradingScreen"
import { signOut } from "../../firebase/config"
import { Button } from "react-native"

const TradingScreenStack = createStackNavigator()
function TradingScreenNavigator() {
  return (
    <TradingScreenStack.Navigator>
      <TradingScreenStack.Screen
        name="Trading"
        component={TradingScreen}
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
    </TradingScreenStack.Navigator>
  )
}

export default TradingScreenNavigator
