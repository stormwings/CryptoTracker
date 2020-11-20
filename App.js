import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import CoinsStack from './src/components/view/CoinsStack';
import FavoritesStack from './src/components/view/FavoritesStack';

import store from './src/redux/store';
export let persistor = store();

const Tabs = createBottomTabNavigator();

const ReduxContainer = (props) => (
  <Provider store={persistor.store}>
    <PersistGate loading={null} persistor={persistor.persistor}>
      {props.children}
    </PersistGate>
  </Provider>
);

const App = () => {
  return (
    <ReduxContainer>
      <NavigationContainer>
        <Tabs.Navigator tabBarOptions={styles.tabBar}>
          <Tabs.Screen
            name="Favorites"
            component={FavoritesStack}
            options={tabsConfigs.favorites}
          />
          <Tabs.Screen
            name="Coins"
            component={CoinsStack}
            options={tabsConfigs.coins}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </ReduxContainer>
  );
};

const tabsConfigs = {
  coins: {
    tabBarIcon: ({ size, color }) => (
      <Image
        style={{ tintColor: color, width: size, height: size }}
        source={require('./src/assets/bank.png')}
      />
    ),
  },
  favorites: {
    tabBarIcon: ({ size, color }) => (
      <Image
        style={{ tintColor: color, width: size, height: size }}
        source={require('./src/assets/star.png')}
      />
    ),
  },
};

const styles = {
  tabBar: {
    tintColor: '#fefefe',
    style: {
      backgroundColor: 'black',
    },
  },
};

export default App;
