/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

// Page
import RootScreen from './src/routes/rootScreen';
import SplashScreen from './src/screens/intro/SplashScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLogin(true);
    }, 1000);
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? (
        <SignInScreen />
      ) : isSplashScreen ? (
        <SplashScreen />
      ) : (
        <RootScreen />
      )}
    </NavigationContainer>
  );
}

export default App;
