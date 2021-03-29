import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SearchScreen = ({navigation}) => {
  return(
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Detail')
      }}>
        <Text>To Detail</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SearchScreen;