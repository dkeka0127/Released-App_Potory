import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <Text>개인정보 처리방침</Text>
    </View>
  );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
