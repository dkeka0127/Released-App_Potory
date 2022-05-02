// React & Package
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import SettingContent from '../components/SettingContent';
import SettingBottom from '../components/SettingBottom';

// image
const backgroundImg = '../../../assets/images/background/mainPhoto_bg.png';

// variable
const IconSize = 17;
const IconColor = '#111';

function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/*---------- Header ----------*/}
      <CustomHeader headerTitle={'설정'} goBackArrow={true} />

      {/*---------- Content ----------*/}
      <SettingContent />

      {/*---------- Footer ----------*/}
      <SettingBottom />
    </SafeAreaView>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 설정페이지 배경색
    backgroundColor: '#fafafa',
  },
});
