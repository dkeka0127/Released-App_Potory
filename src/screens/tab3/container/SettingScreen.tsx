// React & Package
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/*---------- Header ----------*/}
      <CustomHeader
        headerTitle={'설정'}
        goBackArrow={true}
        navigation={navigation}
      />

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
