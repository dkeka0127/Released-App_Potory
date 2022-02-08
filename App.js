/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// Page
import SplashScreen from './src/routes/SplashScreen';
import SignInScreen from './src/routes/SignInScreen';
import RootScreen from './src/routes/RootScreen';

function App() {
  const [isLogin, setIsLogin] = useState(null);
  const [closeSplashScreen, setCloseSplashScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user_id').then(value => {
        setCloseSplashScreen(true);
        value === null ? setIsLogin(false) : setIsLogin(true);
      });
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {!closeSplashScreen ? (
        <SplashScreen />
      ) : isLogin ? (
        <SignInScreen />
      ) : (
        <RootScreen />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
