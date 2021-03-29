import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = ({navigation}) => {
  return(
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Register')
      }}>
        <Text>To Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen;