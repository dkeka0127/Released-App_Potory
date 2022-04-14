/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

// Image
// const image1 = '../../assets/images/image1.png';
// const image2 = '../../assets/images/image1.png';
// const image3 = '../../assets/images/image1.png';

function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* <Image source={require(image1)} />
      <Image source={require(image2)} />
      <Image source={require(image3)} /> */}
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
