import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

// const loadingImg = require('../assets/images/potory/loading.gif');
const loadingImg = require('../assets/images/potory/loading1.gif');

const Loading = () => {
  return (
    <FastImage resizeMode="cover" source={loadingImg} style={styles.content} />
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // flex: 1,
    width: 160,
    height: 160,
  },
});
