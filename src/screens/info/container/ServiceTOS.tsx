import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ServiceTOS() {
  return (
    <View style={styles.container}>
      <Text>서비스 이용약관</Text>
    </View>
  );
}

export default ServiceTOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
