import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;
