import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreenNavigator from './LoginScreenNavigator'
import BottomTabNavigator from './BottomTabNavigator';

const MainPageLoginStack = createStackNavigator();
function MainPageLoginNavigator() {
  return (
    <MainPageLoginStack.Navigator
      screenOptions={{headerShown: false}}
    >
      <MainPageLoginStack.Screen 
        name="LoginRegister"
        component={LoginScreenNavigator}
      />
      <MainPageLoginStack.Screen 
        name="MainPage"
        component={BottomTabNavigator}
      />
    </MainPageLoginStack.Navigator>
  );
}

export default MainPageLoginNavigator;