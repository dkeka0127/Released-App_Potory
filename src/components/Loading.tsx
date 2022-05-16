import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const loadingImg = require('../assets/images/potory/loading.gif');

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
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
