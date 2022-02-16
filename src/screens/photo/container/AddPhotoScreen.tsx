import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function AddPhotoScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Photo</Text>
    </View>
  );
}

export default AddPhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
