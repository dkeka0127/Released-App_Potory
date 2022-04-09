import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Awesome5Icons from 'react-native-vector-icons/FontAwesome5';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Header(props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>sol</Text>
      </View>
      <View style={styles.content}>
        <Text>sol</Text>
      </View>
    </View>
  );
}

export default Header;

const containerPadding = 15;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: containerPadding,
    paddingRight: containerPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fee',
  },
  content: {
    height: '100%',
    backgroundColor: 'pink',
  },
});
