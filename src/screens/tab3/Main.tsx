// React & Package
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

// custom component
import Header from './components/Header';
import Content from './components/Content';
import {ScrollView} from 'react-native-gesture-handler';

// variable
const backgroundColor = '#fdfcff';

function MainInfo() {
  return (
    // <ScrollView style={styles.container}>
    <SafeAreaView style={styles.container}>
      <Header />
      <Content />
    </SafeAreaView>
    // </ScrollView>
  );
}

export default MainInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
});
