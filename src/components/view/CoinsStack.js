import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from '../smart/CoinsScreen';
import CoinDetailScreen from '../smart/CoinDetailScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={CoinsScreen} name="CoinsScreen" />
      <Stack.Screen component={CoinDetailScreen} name="CoinDetailScreen" />
    </Stack.Navigator>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: 'black',
    shadowColor: 'black',
  },
  headerTintColor: 'white',
};

export default CoinsStack;
