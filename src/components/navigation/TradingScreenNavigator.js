import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TradingScreen from '../../screens/TradingScreen';

const TradingScreenStack = createStackNavigator();
function TradingScreenNavigator() {
    return (
        <TradingScreenStack.Navigator>
            <TradingScreenStack.Screen
                name="Trading"
                component={TradingScreen}
            />
        </TradingScreenStack.Navigator>
    );
}

export default TradingScreenNavigator;