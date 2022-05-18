/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* React & Package */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

/* custom components */
import RootScreen from './src/routes/rootScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

// variable
const lottiePath = require('./src/assets/lottie/splash.json');

function App() {
  const [autoLogin, setAutoLogin] = useState(null);

  // useEffect
  useEffect(() => {
    SplashScreen.hide();

    setTimeout(() => {
      getUserInfoAsync();
    }, 2000);
  }, []);

  // function
  const getUserInfoAsync = () => {
    AsyncStorage.getItem('userInfo', (err, result) => {
      const UserInfo = JSON.parse(result);

      if (UserInfo === null) {
        setAutoLogin(false);
        console.log('UserInfo == null 로그인 창으로 !');
      } else if (!UserInfo.autoLogin) {
        setAutoLogin(false);
        console.log(' 로그인 창으로 이동 !', UserInfo);
      } else if (UserInfo.autoLogin) {
        setAutoLogin(true);
        console.log(' 자동 로그인 !', UserInfo);
      }
    });
  };

  const isLoginCheck = () => setAutoLogin(true);

  return (
    <NavigationContainer>
      {autoLogin === null ? (
        // Splash Image
        <LottieView
          autoPlay
          speed={1}
          resizeMode="cover"
          source={lottiePath}
          style={styles.lottieContainer}
        />
      ) : autoLogin ? (
        // Home Screen
        <RootScreen />
      ) : (
        // Login Screen
        <SignInScreen isLoginF={isLoginCheck} />
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

/////////////////////////////////////////////////////////////////////////
// userIndex hook 사용 방법

// import {getAsyncStorage_userIdx} from 'core/UserInfo';
// const [userIdx, setUseIdx] = useState(null);
// getAsyncStorage_userIdx().then(res => setUseIdx(res));
// console.log('userIdx', userIdx);

/////////////////////////////////////////////////////////////////////////
