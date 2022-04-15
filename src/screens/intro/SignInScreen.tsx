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
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';

// icons & images
import Ionicons from 'react-native-vector-icons/Ionicons';
const potoryImg = require('../../assets/images/potory/login.png');
const kakaoImg = require('../../assets/images/icons/kakaoLogin.png');

function SignInScreen({isLoginF}) {
  const [deviceId, setDeviceId] = useState<string>();

  // [Kakao] Login
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    getProfile();
    console.log('token ========== ', token);
  };

  // [Kakao] Get device_Id
  const getProfile = async (): Promise<void> => {
    const profile = await getKakaoProfile();
    await setDeviceId(profile.id);
    console.log('profile =============== ', profile);
  };

  // 로그인 성공 시 서버로 device_Id 전송
  useEffect(() => {
    if (deviceId) {
      // 서버에 device_id 넘겨줌
      isLoginF(true);
    }
  }, [deviceId]);

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
          style={styles.loginContainer}
          onPress={signInWithKakao}>
          <Image source={kakaoImg} style={styles.kakaoImg} />
          <Text style={styles.loginText}>카카오 계정으로 로그인</Text>
        </TouchableOpacity>

        {/*---------------- Apple ----------------*/}
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
