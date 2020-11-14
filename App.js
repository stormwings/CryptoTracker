import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from './src/components/view/CoinsStack';

const App = () => {
  return (
    <NavigationContainer>
      <CoinsStack />
    </NavigationContainer>
  );
};

export default App;
