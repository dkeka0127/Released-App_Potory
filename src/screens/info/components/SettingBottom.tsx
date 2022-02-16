import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

const IconSize = 17;
const IconColor = '#111';

function SettingBottom() {
  return (
    <View style={styles.bottomContainer}>
      <Text style={{fontSize: 15, fontWeight: '400'}}>
        photoinmemory@naver.com
      </Text>
      <Text style={{fontSize: 17, marginTop: 10, fontWeight: '600'}}>
        Photo in memory
      </Text>
    </View>
  );
}

export default SettingBottom;

const styles = StyleSheet.create({
  bottomContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    // paddingBottom: 10 + getBottomSpace(),
    ...ifIphoneX({paddingBottom: 40}, {paddingBottom: 30}),
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
});
