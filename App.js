/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';

// Page
import RootScreen from './src/routes/rootScreen';
// import SplashScreen from './src/screens/intro/SplashScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

function App() {
  const [isLogin, setIsLogin] = useState(null);
  // const [isSplashScreen, setIsSplashScreen] = useState(true);

  const isLoginF = value => {
    setIsLogin(true);
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);

    // if (isLogin) {}
  }, [isLogin]);

  return (
    <NavigationContainer>
      {!isLogin ? <SignInScreen isLoginF={isLoginF} /> : <RootScreen />}
      {/* {!isLogin ? (
        <SignInScreen isLoginF={isLoginF} />
      ) : isSplashScreen ? (
        <SplashScreen />
      ) : (
        <RootScreen />
      )} */}
      {/* <RootScreen /> */}
    </NavigationContainer>
  );
}

export default App;
