import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';

const HomeScreenStack = createStackNavigator();
function HomeScreenNavigator() {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen 
        name="Home"
        component={HomeScreen}
      />
    </HomeScreenStack.Navigator>
  );
}

export default HomeScreenNavigator;