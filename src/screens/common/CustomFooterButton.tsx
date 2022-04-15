// React & Package
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ifIphoneX, getBottomSpace} from 'react-native-iphone-x-helper';

function CustomFooterButton({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.buttonText}>확인</Text>
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
    width: '85%',
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
function useNavigation() {
  throw new Error('Function not implemented.');
}
