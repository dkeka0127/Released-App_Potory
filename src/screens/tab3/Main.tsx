/* React & Package */
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

/* custom components */
import Header from './components/Header';
import Content from './components/Content';

function MainInfo() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Content />
    </SafeAreaView>
  );
}

export default MainInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfcff',
  },
});
