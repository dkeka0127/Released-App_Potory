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
import {userNum} from './src/core/UserInfo';
const lottiePath = require('./src/assets/lottie/splash.json');

function App() {
  const [isLogin, setIsLogin] = useState(null);

  // useEffect (splash / api / async)
  useEffect(() => {
    SplashScreen.hide();

    api_checkDeviceExist(userNum)
      .then(res => {
        console.log('api_checkDeviceExist Success == !! ', res.data.data);
      })
      .catch(err => {
        console.log('api_checkDeviceExist Err == !! ', err);
      });

    setTimeout(() => {
      getLoginAsync();
    }, 1800);
  }, []);

  // function
  const getLoginAsync = () =>
    AsyncStorage.getItem('login', (_err, value) => {
      value === 'true' ? setIsLogin(true) : setIsLogin(false);
    });

  const isLoginF = () => setIsLogin(true);

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
