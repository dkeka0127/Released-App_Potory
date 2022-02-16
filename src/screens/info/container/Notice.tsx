import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Notice() {
  return (
    <View style={styles.container}>
      <Text>공지사항</Text>
    </View>
  );
}

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
