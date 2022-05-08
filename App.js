/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// Page
import Loading from './src/components/Loading';
import RootScreen from './src/routes/rootScreen';
// import SplashScreen from './src/screens/intro/SplashScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

function App() {
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

  function connectAPI() {
    const response = axios
      .get('http://bdg407.synology.me:12162/user/8', axiosConfig)
      .then(response => {
        console.log('API response == ', response);
      })
      .catch(err => {
        console.log('API err == ', err);
      });

    return response;
  }

  const [isLogin, setIsLogin] = useState(null);
  // const [isSplashScreen, setIsSplashScreen] = useState(true);

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

  const isLoginF = value => {
    setIsLogin(true);
  };

  // 로그인 이력 확인 Async
  const getLoginAsync = () => {
    AsyncStorage.getItem('login', (_err, value) => {
      // console.log('getLoginAsync _err == ', _err);
      // console.log(' getLoginAsync value == ', value);
      // console.log(' getLoginAsync value == ', typeof value);
      if (value === 'true') {
        // console.log('true !');
        setIsLogin(true);
      } else {
        // console.log('false !');
        setIsLogin(false);
      }
    });
  };

  useEffect(() => {
    SplashScreen.hide();
    connectAPI();
    setTimeout(() => {
      getLoginAsync();
    }, 1800);
  }, []);

  // useEffect(() => {
  //   isLogin && SplashScreen.hide();
  // }, [isLogin]);

  if (isLogin === null) {
    return (
      <View style={{flex: 1}}>
        <LottieView
          resizeMode="cover"
          style={{flex: 1}}
          source={require('./src/assets/lottie/splash.json')}
          autoPlay
          speed={1.2}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLogin ? <RootScreen /> : <SignInScreen isLoginF={isLoginF} />}
    </NavigationContainer>
  );
}

export default App;
