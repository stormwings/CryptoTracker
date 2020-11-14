import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from '../smart/CoinsScreen';
import CoinDetailScreen from '../smart/CoinDetailScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen component={CoinsScreen} name="CoinsScreen" />
      <Stack.Screen component={CoinDetailScreen} name="CoinDetailScreen" />
    </Stack.Navigator>
  );
};

export default CoinsStack;
