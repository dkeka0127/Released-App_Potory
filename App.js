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
    // setTimeout(() => {
    //   AsyncStorage.getItem('user_id').then(value => {
    //     value === null ? setIsLogin(false) : setIsLogin(true);
    //     setCloseSplashScreen(true);
    //   });
    // }, 3000);
    setIsLogin(true);
    setCloseSplashScreen(true);
  }, []);

  return (
    <NavigationContainer>
      {!closeSplashScreen ? (
        <SplashScreen />
      ) : !isLogin ? (
        <SignInScreen />
      ) : (
        <RootScreen />
      )}
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
