/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* React & Package */
import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

/* custom components */
import Toast from '../../components/Toast/Toast';

/* api */
import {api_registDevice} from '../../core/api/Module';

/* kakao */
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  login,
  getProfile,
  KakaoProfile,
} from '@react-native-seoul/kakao-login';

/* apple */
import {
  appleAuth,
  AppleButton,
  AppleCredentialState,
} from '@invertase/react-native-apple-authentication';

/* icons & images */
import Ionicons from 'react-native-vector-icons/Ionicons';
const potoryImg = require('../../assets/images/potory/login.png');
const kakaoImg = require('../../assets/images/icons/kakaoLogin.png');

/* interface */
interface Props {
  userNum: number;
  isLoginF: () => void;
}

function SignInScreen({isLoginF}: Props) {
  console.log('came to login');
  // variable

  // api
  const connectAPI_registDevice = (deviceId: string) => {
    // 로딩 추가
    api_registDevice(deviceId)
      .then(async res => {
        // 로딩 삭제
        const userIdx = await res.data.data.user_idx;
        await savePopupAsync();
        await saveLoginAsync(userIdx);
        await isLoginF();
        console.log('userIdx == ', userIdx);
        console.log('api_registDevice Success == !! ', res.data.data);
      })
      .catch(err => {
        // 네트워크 에러 토스트 창
        console.log('api_registDevice Err == !! ', err);
      });
  };

  // function
  const saveLoginAsync = (userIdx: number) => {
    AsyncStorage.setItem(
      'userInfo',
      JSON.stringify({autoLogin: true, userNumber: String(userIdx)}),
      () => console.log('[로그인] 유저정보 저장 == ', userIdx),
    );
  };

  const savePopupAsync = () => {
    AsyncStorage.getItem('popupNum', (err, value) => {
      console.log('popupNum async == ', value);
      if (value === null) AsyncStorage.setItem('popupNum', '0');
    });
  };

  // -------------------- ① Kakao --------------------
  const loginWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    console.log('kakao token ==  ', token);
    getUserProfileOfKakao();
  };

  const getUserProfileOfKakao = async () => {
    // const profile = await getProfile();
    const profile = await getKakaoProfile();
    await connectAPI_registDevice(profile.id);
  };

  // -------------------- ② Apple --------------------
  const LoginWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      await connectAPI_registDevice(appleAuthRequestResponse.user);
      console.log('apple login - user ID', appleAuthRequestResponse.user);
    } catch (error) {
      console.error(error);
      Toast.show('로그인에 실피하였습니다.\n다시 시도해주세요.');
      // return;
    }
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
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={styles.appleLoginArea}
            onPress={LoginWithApple}>
            <Ionicons name="logo-apple" size={20} color="#fff" />
            <Text style={styles.appleLogin}>Sign in with Apple</Text>
          </TouchableOpacity>
        )}
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

// [Apple Login] try / catch 문 : try

// const {
//   user: newUser,
//   email,
//   nonce,
//   identityToken,
//   realUserStatus /* etc */,
// } = appleAuthRequestResponse;
// // user = newUser;
// // fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
// //   updateCredentialStateForUser(`Error: ${error.code}`),
// // );
// if (identityToken) {
//   // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
//   console.log(nonce, identityToken);
// } else {
//   // no token - failed sign-in?
// }
// if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
//   console.log("I'm a real person!");
// }
// // console.warn(`Apple Authentication Completed, ${user}, ${email}`);
