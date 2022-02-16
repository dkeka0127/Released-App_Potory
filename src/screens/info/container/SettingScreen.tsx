import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Page
import SettingContent from '../components/SettingContent';
import SettingBottom from '../components/SettingBottom';
// Image
const backgroundImg = '../../../assets/images/mainPhoto_bg.png';

const IconSize = 17;
const IconColor = '#111';

function SettingScreen() {
  return (
    <View style={styles.container}>
      <SettingContent />
      <SettingBottom />
    </View>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 설정페이지 배경색
    backgroundColor: '#fafafa',
    // backgroundColor: '#fbfbf8',
    // backgroundColor: '#fff',
  },
});
