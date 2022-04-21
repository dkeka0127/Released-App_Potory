/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// Page
import Loading from './src/components/Loading';
import RootScreen from './src/routes/rootScreen';
// import SplashScreen from './src/screens/intro/SplashScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

function App() {
  const api = () => {
    fetch('http://bdg407.synology.me:12162/user/7')
      .then(response => {
        console.log('API response == ', response);
      })
      .catch(err => {
        console.log('API err == ', err);
      });
  };

  useEffect(() => {
    api();
  }, []);
  const [isLogin, setIsLogin] = useState(null);
  // const [isSplashScreen, setIsSplashScreen] = useState(true);

  const isLoginF = value => {
    setIsLogin(true);
  };

  const getLoginAsync = () => {
    AsyncStorage.getItem('login', (_err, value) => {
      console.log('getLoginAsync _err == ', _err);
      console.log(' getLoginAsync value == ', value);
      console.log(' getLoginAsync value == ', typeof value);
      if (value === 'true') {
        console.log('true !');
        setIsLogin(true);
      } else {
        console.log('false !');
        setIsLogin(false);
      }
    });
  };

  useEffect(() => {
    getLoginAsync(); // 로그인 이력 확인
  }, []);

  // useEffect(() => {
  //   isLogin && SplashScreen.hide();
  // }, [isLogin]);

  if (isLogin === null) {
    return (
      <View style={{flex: 1}}>
        <Loading />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* {isLogin ? <RootScreen /> : <SignInScreen isLoginF={isLoginF} />} */}
      {/* {!isLogin ? (
        <SignInScreen isLoginF={isLoginF} />
      ) : isSplashScreen ? (
        <SplashScreen />
      ) : (
        <RootScreen />
      )} */}
      {/* <RootScreen /> */}
      <SignInScreen isLoginF={isLoginF} />
    </NavigationContainer>
  );
}

export default App;
