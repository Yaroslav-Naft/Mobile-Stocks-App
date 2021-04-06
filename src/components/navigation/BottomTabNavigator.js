import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"
import HomeScreenNavigator from "./HomeScreenNavigator"
import SearchScreenNavigator from "./SearchScreenNavigator"
import TradingScreenNavigator from "./TradingScreenNavigator"
import WatchScreenNavigator from "./WatchScreenNavigator"
import UserScreenNavigator from "./UserScreenNavigator"

const BottomTab = createBottomTabNavigator()
export default function BottomTabNavigator({ user }) {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <Entypo name="home" size={30} color="black" />,
        }}
      >
        {(props) => <HomeScreenNavigator {...props} user={user} />}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Trading"
        options={{
          tabBarIcon: () => (
            <Ionicons name="bar-chart-outline" size={30} color="black" />
          ),
        }}
      >
        {(props) => <TradingScreenNavigator {...props} user={user} />}
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Watch"
        component={WatchScreenNavigator}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="currency-usd-circle-outline"
              size={30}
              color="black"
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Search"
        options={{
          tabBarIcon: () => (
            <Ionicons name="search-sharp" size={30} color="black" />
          ),
        }}
      >
      {(props) => <SearchScreenNavigator {...props} user={user} />} 
      </BottomTab.Screen>

      <BottomTab.Screen
        name="User"
        component={UserScreenNavigator}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user-circle-o" size={30} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
