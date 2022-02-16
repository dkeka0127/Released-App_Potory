import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function EditPhotoScreen() {
  return (
    <View style={styles.container}>
      <Text>EditPhotoScreen</Text>
    </View>
  );
}

export default EditPhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
