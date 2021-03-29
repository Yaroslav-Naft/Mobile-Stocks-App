import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const LoginScreenStack = createStackNavigator();
function LoginScreenNavigator() {
  return (
    <LoginScreenStack.Navigator>
      <LoginScreenStack.Screen 
        name="Login"
        component={LoginScreen}
      />
      <LoginScreenStack.Screen 
        name="Register"
        component={RegisterScreen}
      />
    </LoginScreenStack.Navigator>
  );
}

export default LoginScreenNavigator;