/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* React & Package */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import LottieView from 'lottie-react-native';
import codePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import mobileAds from 'react-native-google-mobile-ads';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

/* custom components */
import RootScreen from './src/routes/rootScreen';
import SignInScreen from './src/screens/intro/SignInScreen';

/* variable */
const lottiePath = require('./src/assets/lottie/splash.json');

/* codepush */
const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: false, // 잠수함 패치 = false
  installMode: codePush.InstallMode.ON_NEXT_RESUME, // 백그라운드 -> 포그라운드
  // checkFrequency: codePush.CheckFrequency.ON_APP_START,
  // installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
  // minimumBackgroundDuration: 60,
};

/* 디바이스 내애서 설정한 글자 크기 영향을 받지 않음 */
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

function App() {
  const [autoLogin, setAutoLogin] = useState(null);

  // useEffect
  useEffect(() => {
    // codepush
    // codePush.sync({
    //   // installMode: codePush.InstallMode.ON_NEXT_RESTART,
    //   installMode: codePush.InstallMode.ON_NEXT_SUSPEND,
    //   minimumBackgroundDuration: 60,
    // });

    // splashImage
    SplashScreen.hide();

    // 광고 sdk 초기화
    mobileAds()
      .initialize()
      .then(res => console.log('AdMob initialize complete == '))
      .catch(err => console.log('AdMob initialize err!', err));

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
        console.log('UserInfo == null & 로그인');
      } else if (!UserInfo.autoLogin) {
        setAutoLogin(false);
        console.log('UserInfo == true & 로그인', UserInfo);
      } else if (UserInfo.autoLogin) {
        setAutoLogin(true);
        console.log('자동 로그인', UserInfo);
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

export default codePush(codePushOptions)(App);

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
