/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
// import {
//   KakaoOAuthToken,
//   KakaoProfile,
//   getProfile as getKakaoProfile,
//   login,
//   logout,
//   unlink,
// } from '@react-native-seoul/kakao-login';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
// Images
const backgroundImg = '../../assets/images/MainPhoto_bg.png';

function SignInScreen() {
  // Kakao Login
  const [result, setResult] = useState<string>('');
  // 회원가입
  // const signInWithKakao = async (): Promise<void> => {
  // const token: KakaoOAuthToken = await login();
  // setResult(JSON.stringify(token));
  // };
  // const getProfile = async (): Promise<void> => {
  //   const profile: KakaoProfile = await getKakaoProfile();
  //   setResult(JSON.stringify(profile));
  // };

  return (
    <ImageBackground source={require(backgroundImg)} style={styles.bgImage}>
      <View style={styles.flex6} />
      <View style={styles.flex4}>
        {/* Kakao Login */}
        <TouchableOpacity
          style={[styles.loginContainer, {backgroundColor: '#f7e600'}]}
          onPress={() => {
            // signInWithKakao();
          }}>
          <Image
            source={require('../../assets/images/kakaoLogin.png')}
            style={{width: 16, height: 16}}
          />
          <Text style={styles.kakaoLogin}>카카오 계정으로 로그인</Text>
        </TouchableOpacity>
        {/* Apple Login */}
        <TouchableOpacity
          style={[styles.loginContainer, {backgroundColor: '#222'}]}
          onPress={() => {
            // signInWithKakao();
          }}>
          <Ionicons name="logo-apple" size={20} color="#fff" />
          <Text style={styles.appleLogin}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  flex6: {
    flex: 6,
  },
  flex4: {
    flex: 4,
    alignItems: 'center',
  },
  loginContainer: {
    width: '75%',
    height: 50,
    marginBottom: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  appleLogin: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  kakaoLogin: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
  },
});
