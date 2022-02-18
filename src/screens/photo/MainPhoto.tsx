import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
// Page
import Header from './components/Header';
import Content from './components/Content';
import BottomButton from './components/BottomButton';
// Image
const backgroundImg = '../../assets/images/mainPhoto_bg.png';

function MainPhoto() {
  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <Header />
        <Content />
        <BottomButton />
      </SafeAreaView>
    </ImageBackground>
  );
}

export default MainPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  safeAreaViewContainer: {
    flex: 1,
  },
});
