/* React & Package */
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

/* custom components */
import CustomHeader from '../../../components/header/CustomHeader';
import SettingContent from '../components/SettingContent';
import SettingBottom from '../components/SettingBottom';

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
    backgroundColor: '#fff', // 설정페이지 배경색
  },
});
