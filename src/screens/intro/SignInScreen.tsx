/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// React & Package
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
// kakao
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';
// apple
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';

// icons & images
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
const potoryImg = require('../../assets/images/potory/login.png');
const kakaoImg = require('../../assets/images/icons/kakaoLogin.png');

function SignInScreen({isLoginF}) {
  const [deviceId, setDeviceId] = useState<string>();

  // -------------- ① Kakao --------------
  // Login
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    getProfile();
    console.log('token ========== ', token);
  };
  // Get device_Id
  const getProfile = async (): Promise<void> => {
    const profile = await getKakaoProfile();
    await setDeviceId(profile.id);
    console.log('profile =============== ', profile);
  };

  // -------------- ② Apple --------------
  let user = null;

  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  // Login
  async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn('Beginning Apple Authentication');

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      user = newUser;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
        updateCredentialStateForUser(`Error: ${error.code}`),
      );

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }
  // Get device_Id

  // 로그인 성공 시 실행
  useEffect(() => {
    if (deviceId) {
      setLoginAsync(); // 자동 로그인
      isLoginF(true); // 서버에 device_id 넘겨줌
    }
  }, [deviceId]);

  // 로그인 성공 시 Async Storage에 저장 (* 자동 로그인)
  const setLoginAsync = () => {
    AsyncStorage.setItem('login', 'true');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} />

      {/*============================= Image =============================*/}
      <View style={styles.logoContent}>
        <Image source={potoryImg} style={styles.logoImg} />
      </View>

      {/*============================= Login =============================*/}
      <View style={styles.loginContent}>
        {/*---------------- Kakao ----------------*/}
        <TouchableOpacity
          style={styles.kakaoLoginArea}
          onPress={signInWithKakao}>
          <Image source={kakaoImg} style={styles.kakaoImg} />
          <Text style={styles.kakaoLogin}>카카오 계정으로 로그인</Text>
        </TouchableOpacity>

        {/*---------------- Apple ----------------*/}
        <TouchableOpacity
          style={styles.appleLoginArea}
          // onPress={onAppleButtonPress}
        >
          <Ionicons name="logo-apple" size={20} color="#fff" />
          <Text style={styles.appleLogin}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content} />
    </SafeAreaView>
  );
}

export default SignInScreen;

const marginTop = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  logoContent: {
    flex: 1,
    marginTop: marginTop,
    marginLeft: 10,
    marginRight: 10,
  },
  loginContent: {
    flex: 1,
    marginTop: marginTop + 10,
    alignItems: 'center',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  kakaoLoginArea: {
    width: '75%',
    height: 50,
    marginBottom: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',
  },
  appleLoginArea: {
    width: '75%',
    height: 50,
    marginBottom: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  appleLogin: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 10,
  },
  kakaoLogin: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  kakaoImg: {
    width: 16,
    height: 16,
  },
});
