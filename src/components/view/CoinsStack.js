import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from '../smart/CoinsScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={CoinsScreen}
        name="Coins"
        style={{}}
        testID="CoinsScreen"
      />
    </Stack.Navigator>
  );
};

export default CoinsStack;
