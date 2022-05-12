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
import AsyncStorage from '@react-native-community/async-storage';

// kakao
import {getProfile} from '@react-native-seoul/kakao-login';

// apple
import {
  appleAuth,
  AppleButton,
  AppleCredentialState,
} from '@invertase/react-native-apple-authentication';

// icons & images
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api_registDevice} from '../../core/api/Module';
const potoryImg = require('../../assets/images/potory/login.png');
const kakaoImg = require('../../assets/images/icons/kakaoLogin.png');

interface Props {
  userNum: number;
  isLoginF: () => void;
}

function SignInScreen({isLoginF}: Props) {
  // variable

  // -------------- ① Kakao --------------
  const loginWithKakao = async () => {
    const profile = await getProfile();
    // await setDeviceId(profile.id);
    console.log(profile.id);
    await connectAPI_registDevice(profile.id);
  };

  // -------------- ② Apple --------------
  const LoginWithApple = async () => {
    //
  };

  const connectAPI_registDevice = (deviceId: string) => {
    // 로딩 추가
    api_registDevice(deviceId)
      .then(res => {
        // 로딩 삭제
        const userIdx = res.data.data.user_idx;
        isLoginF();
        saveLoginAsync(userIdx);
        console.log('api_checkDeviceExist Success == !! ', res.data.data);
      })
      .catch(err => {
        // 네트워크 에러 토스트 창
        console.log('api_checkDeviceExist Err == !! ', err);
      });
  };

  const saveLoginAsync = (userIdx: number) => {
    AsyncStorage.setItem(
      'userInfo',
      JSON.stringify({autoLogin: true, userNumber: String(userIdx)}),
      () => console.log('[로그인] 유저정보 저장'),
    );
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
          onPress={loginWithKakao}>
          <Image source={kakaoImg} style={styles.kakaoImg} />
          <Text style={styles.kakaoLogin}>카카오 계정으로 로그인</Text>
        </TouchableOpacity>

        {/*---------------- Apple ----------------*/}
        <TouchableOpacity
          style={styles.appleLoginArea}
          onPress={LoginWithApple}>
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

// -------------- ① Kakao --------------
// const signInWithKakao = async (): Promise<void> => {
// const token: KakaoOAuthToken = await login();
// console.log('token ==  ', token);
// };

// -------------- ② Apple --------------
// let user: string | null = null;

// async function fetchAndUpdateCredentialState(
//   updateCredentialStateForUser: any,
// ) {
//   if (user === null) {
//     updateCredentialStateForUser('N/A');
//   } else {
//     const credentialState = await appleAuth.getCredentialStateForUser(user);
//     if (credentialState === appleAuth.State.AUTHORIZED) {
//       updateCredentialStateForUser('AUTHORIZED');
//     } else {
//       updateCredentialStateForUser(credentialState);
//     }
//   }
// }

// // Login
// async function onAppleButtonPress(updateCredentialStateForUser: any) {
//   console.warn('Beginning Apple Authentication');

//   // start a login request
//   try {
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     console.log('appleAuthRequestResponse', appleAuthRequestResponse);

//     const {
//       user: newUser,
//       email,
//       nonce,
//       identityToken,
//       realUserStatus /* etc */,
//     } = appleAuthRequestResponse;

//     user = newUser;

//     fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
//       updateCredentialStateForUser(`Error: ${error.code}`),
//     );

//     if (identityToken) {
//       // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
//       console.log(nonce, identityToken);
//     } else {
//       // no token - failed sign-in?
//     }

//     if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
//       console.log("I'm a real person!");
//     }

//     console.warn(`Apple Authentication Completed, ${user}, ${email}`);
//   } catch (error) {
//     if (error.code === appleAuth.Error.CANCELED) {
//       console.warn('User canceled Apple Sign in.');
//     } else {
//       console.error(error);
//     }
//   }
// }
// Get device_Id
