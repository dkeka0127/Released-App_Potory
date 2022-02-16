import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function LocationTOS() {
  return (
    <View style={styles.container}>
      <Text>위치정보 이용약관</Text>
    </View>
  );
}

export default LocationTOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
