import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CoinsStack from './src/components/view/CoinsStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator tabBarOptions={styles.tabBar}>
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={tabsConfigs.coins}
        />
      </Tabs.Navigator>
    </NavigationContainer>
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
