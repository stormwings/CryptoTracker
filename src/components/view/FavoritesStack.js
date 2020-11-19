import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../smart/FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={FavoritesScreen} name="FavoritesScreen" />
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

export default FavoritesStack;
