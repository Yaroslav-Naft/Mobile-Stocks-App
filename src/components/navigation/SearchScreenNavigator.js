import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/SearchScreen';
import DetailScreen from '../../screens/DetailScreen';

const SearchScreenStack = createStackNavigator();
function SearchScreenNavigator() {
  return (
    <SearchScreenStack.Navigator>
      <SearchScreenStack.Screen 
        name="Search"
        component={SearchScreen}
      />
      <SearchScreenStack.Screen 
        name="Detail"
        component={DetailScreen}
      />
    </SearchScreenStack.Navigator>
  );
}

export default SearchScreenNavigator;