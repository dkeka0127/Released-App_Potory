// React & Package
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import Entypo from 'react-native-vector-icons/Entypo';

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.navSettingCon}
        onPress={() => navigation.navigate('설정')}>
        <Entypo name="dots-three-vertical" size={19} color="black" />
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
    padding: 10,
    alignItems: 'flex-end',
  },
});
