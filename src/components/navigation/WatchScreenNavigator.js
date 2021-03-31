import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WatchScreen from '../../screens/WatchScreen';

const WatchScreenStack = createStackNavigator();
function WatchScreenNavigator() {
    return (
        <WatchScreenStack.Navigator>
            <WatchScreenStack.Screen
                name="Watch"
                component={WatchScreen}
            />
        </WatchScreenStack.Navigator>
    );
}

export default WatchScreenNavigator;