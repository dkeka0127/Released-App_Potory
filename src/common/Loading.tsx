import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

// Image
// const image1 = '../../assets/images/image1.png';
// const image2 = '../../assets/images/image1.png';
// const image3 = '../../assets/images/image1.png';

function Loading() {
  return (
    <View style={styles.container}>
      {/* <Image source={require(image1)} />
      <Image source={require(image2)} />
      <Image source={require(image3)} /> */}
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
