import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function PhotoInfoPopup() {
  return (
    <View style={styles.container}>
      <Text>PhotoInfoPopup</Text>
    </View>
  );
}

export default PhotoInfoPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
