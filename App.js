/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
// Page
import RootScreen from './src/routes/rootScreen';

function App() {
  // dummy
  const [login, setLogin] = useState(true);

  if (login === false) {
    <SignInScreen />;
  } else if (login === true) {
    return (
      <View style={styles.container}>
        <RootScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
