/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

// Images
import Ionicons from 'react-native-vector-icons/Ionicons';
const potoryImg = require('../../assets/images/potory/login.png');
const kakaoImg = require('../../assets/images/kakaoLogin.png');

function SignInScreen() {
  // device_id
  const [deviceId, setDeviceId] = useState<string>();

  // [Kakao] Login
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    console.log('token ========== ', token);
    getProfile();
  };

  // [Kakao] Get Device ID
  const getProfile = async (): Promise<void> => {
    const profile = await getKakaoProfile();
    await setDeviceId(profile.id);
    console.log('profile =============== ', profile);
  };

  // 로그아웃
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
    console.log('==============', message);
    // setResult(message);
  };

  // 회원탈퇴
  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
    // setResult(message);
  };

  useEffect(() => {
    if (deviceId) {
      // login();
      console.log('device id 있음 ............');
    } else {
      console.log('device id 없음 ............');
    }
  }, [deviceId]);

  console.log('========== deviceId ==========', deviceId);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} />

      {/***************************** Image *****************************/}
      <View style={styles.logoContent}>
        <Image source={potoryImg} style={styles.logoImg} />
      </View>

      {/***************************** Login *****************************/}
      <View style={styles.loginContent}>
        {/* Kakao */}
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={signInWithKakao}>
          <Image source={kakaoImg} style={styles.kakaoImg} />
          <Text style={styles.loginText}>카카오 계정으로 로그인</Text>
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity style={styles.loginContainer} onPress={() => {}}>
          <Ionicons name="logo-apple" size={20} color="#111" />
          <Text style={styles.loginText}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content} />
    </SafeAreaView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  logoContent: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  loginContent: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  loginContainer: {
    width: '77%',
    height: 46,
    marginBottom: 25,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // shadow
    elevation: 4,
    shadowRadius: 1.2,
    shadowOpacity: 0.6,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
    backgroundColor: '#fff',
  },
  loginText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
  kakaoImg: {
    width: 16,
    height: 16,
  },
});
