/* React & packages */
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const loadingImg = require('../assets/images/potory/loading_opacity.gif');

/* variable */
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Loading = () => {
  return (
    <View style={styles.container}>
      <FastImage
        resizeMode="cover"
        source={loadingImg}
        style={styles.content}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: deviceHeight / 2 - 80,
    left: deviceWidth / 2 - 80,
    zIndex: 999,
  },
  content: {
    width: 145,
    height: 145,
  },
});
