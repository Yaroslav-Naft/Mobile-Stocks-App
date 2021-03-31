import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import HomeScreenNavigator from './HomeScreenNavigator';
import SearchScreenNavigator from './SearchScreenNavigator';
import TradingScreenNavigator from './TradingScreenNavigator';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: () => <Entypo name="home" size={30} color="black" />
        }}
      />
      <BottomTab.Screen
        name="Trading"
        component={TradingScreenNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="bar-chart-outline" size={30} color="black" />
        }}
      />

      <BottomTab.Screen
        name="Watch"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="currency-usd-circle-outline" size={30} color="black" />
        }}
      />

      <BottomTab.Screen
        name="Search"
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="search-sharp" size={30} color="black" />
        }}
      />

      <BottomTab.Screen
        name="User"
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: () => <FontAwesome name="user-circle-o" size={30} color="black" />
        }}
      />

    </BottomTab.Navigator>
  );
}