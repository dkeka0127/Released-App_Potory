/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React & packages
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// custom components
import RootScreen from './src/routes/rootScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

// variable
const lottiePath = require('./src/assets/lottie/splash.json');

function App() {
  const [isLogin, setIsLogin] = useState(null);

  // api
  const axiosConfig = {
    // baseURL: '',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      // memberIdx: 0,
      // deviceId: '',
    },
    // timeout: 3000,
  };

  const connectAPI = () => {
    const response = axios
      .get('http://bdg407.synology.me:12162/user/8', axiosConfig)
      .then(response => {
        console.log('API response == ', response);
      })
      .catch(err => {
        console.log('API err == ', err);
      });

    return response;
  };

  {
    /*
  const api = () => {
    fetch('http://bdg407.synology.me:12162/user/8', {
      method: 'GET',
      headers: {
        // 'x-access-token':
        //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoicGhvdG9seSJ9.zcAbn0TXYrHMu4DSTrd7MIuuulrcCBN22_N1jGidLbY',
      },
    })
      .then(response => {
        console.log('API response == ', response);
      })
      .catch(err => {
        console.log('API err == ', err);
      });
  };
    */
  }

  // login
  const isLoginF = () => {
    setIsLogin(true);
  };

  const getLoginAsync = () => {
    AsyncStorage.getItem('login', (_err, value) => {
      value === 'true' ? setIsLogin(true) : setIsLogin(false);
      // if (value === 'true') {
      //   setIsLogin(true);
      // } else {
      //   setIsLogin(false);
      // }
    });
  };

  // useEffect
  useEffect(() => {
    SplashScreen.hide();

    connectAPI();
    setTimeout(() => {
      getLoginAsync();
    }, 1800);
  }, []);

  return (
    <NavigationContainer>
      {isLogin === null ? (
        <LottieView
          resizeMode="cover"
          style={styles.lottieContainer}
          source={lottiePath}
          autoPlay
          speed={1.2}
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
