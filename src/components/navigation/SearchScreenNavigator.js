import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Button } from "react-native"

import SearchScreen from "../../screens/SearchScreen"
import DetailScreen from "../../screens/DetailScreen"
import { signOut } from "../../firebase/config"

const SearchScreenStack = createStackNavigator()
function SearchScreenNavigator() {
  return (
    <SearchScreenStack.Navigator>
      <SearchScreenStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: { backgroundColor: "#1D3557" },
          headerTitleStyle: { color: "#FFFFFF" },
          cardStyle: { backgroundColor: "#1D3557" },
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
      <SearchScreenStack.Screen
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
    </SearchScreenStack.Navigator>
  )
}

export default SearchScreenNavigator
