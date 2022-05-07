// React & Package
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

function CustomFooterButton({title, action}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={action}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomFooterButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    ...ifIphoneX({marginBottom: 0}, {marginBottom: 20}),
    width: '87%',
    height: 60,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
