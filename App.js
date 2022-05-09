/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React & packages
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// custom components
import RootScreen from './src/routes/rootScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

// api
import {api_checkDeviceExist} from './src/core/api/Module';

// variable
const lottiePath = require('./src/assets/lottie/splash.json');

function App() {
  const [isLogin, setIsLogin] = useState(null);

  // login
  const isLoginF = () => setIsLogin(true);

  const getLoginAsync = () =>
    AsyncStorage.getItem('login', (_err, value) => {
      value === 'true' ? setIsLogin(true) : setIsLogin(false);
    });

  // useEffect (splash / api / async)
  useEffect(() => {
    SplashScreen.hide();

    api_checkDeviceExist(8)
      .then(res => {
        console.log('api_checkDeviceExist == !! ', res.data.data);
      })
      .catch(() => {});

    setTimeout(() => {
      getLoginAsync();
    }, 1800);
  }, []);

  return (
    <NavigationContainer>
      {isLogin === null ? (
        <LottieView
          autoPlay
          speed={1.2}
          resizeMode="cover"
          source={lottiePath}
          style={styles.lottieContainer}
        />
      ) : isLogin ? (
        <RootScreen />
      ) : (
        <SignInScreen isLoginF={isLoginF} />
      )}
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
  },
});
