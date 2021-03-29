import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RegisterScreen = ({navigation}) => {
  return(
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Login')
      }}>
        <Text>To Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen;