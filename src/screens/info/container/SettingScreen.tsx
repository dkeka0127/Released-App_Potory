import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';
// Page
import SettingContent from '../components/SettingContent';
import SettingBottom from '../components/SettingBottom';

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
  },
});
