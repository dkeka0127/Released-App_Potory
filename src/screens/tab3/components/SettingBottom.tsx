// React & Package
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

function SettingBottom() {
  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>photoinmemory@naver.com</Text>
      <Text style={styles.logoText}>Photo in memory</Text>
    </View>
  );
}

export default SettingBottom;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    ...ifIphoneX({paddingBottom: 35}, {paddingBottom: 25}),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    // 그림자
    elevation: 4,
    shadowRadius: 6,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(96, 83, 68)',
    shadowOffset: {height: 0, width: 0},
  },
  emailText: {
    fontSize: 15,
    fontWeight: '400',
  },
  logoText: {
    fontSize: 17,
    marginTop: 10,
    fontWeight: '600',
  },
});
