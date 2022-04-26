// React & Package
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.navSettingCon}
        onPress={() => navigation.navigate('설정')}>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  navContainer: {
    height: 55,
    paddingRight: 15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  navSettingCon: {
    padding: 15,
    alignItems: 'flex-end',
  },
});
