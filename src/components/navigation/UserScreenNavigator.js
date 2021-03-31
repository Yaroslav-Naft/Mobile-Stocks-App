import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../../screens/UserScreen';

const UserScreenStack = createStackNavigator();
function UserScreenNavigator() {
    return (
        <UserScreenStack.Navigator>
            <UserScreenStack.Screen
                name="User"
                component={UserScreen}
            />
        </UserScreenStack.Navigator>
    );
}

export default UserScreenNavigator;