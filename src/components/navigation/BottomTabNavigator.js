import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EvilIcons } from '@expo/vector-icons';
import HomeScreenNavigator from './HomeScreenNavigator';
import SearchScreenNavigator from './SearchScreenNavigator';

const BottomTab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreenNavigator}
        options={{
          tabBarIcon: () => <EvilIcons name="star" size={30} color="black" />
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreenNavigator}
        options={{
          tabBarIcon: () => <EvilIcons name="search" size={30} color="black" />
        }} 
      />
    </BottomTab.Navigator>
  );
}