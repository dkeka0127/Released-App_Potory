import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Icons
import CoinIcon from 'react-native-vector-icons/FontAwesome5';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Data
import {userinfo} from '../../../../dummyData';

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.navContainer}>
      {/* Point */}
      <View style={styles.navCoinCon}>
        <MaterialCommunityIcons name="" size={22} color="#fff" />
      </View>
      {/* Title */}
      <View style={styles.navTitleCon}>
        <Text style={styles.navTitleText}>마이페이지</Text>
      </View>
      {/* Setting */}
      <TouchableOpacity
        style={styles.navSettingCon}
        onPress={() => navigation.navigate('설정')}>
        <SettingIcon name="settings-outline" size={23} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  navContainer: {
    height: 55,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#eee',
    // opacity: 0.9,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',

    // shadowRadius: 4,
    // shadowOpacity: 0.2,
    // shadowColor: 'rgb(50, 50, 50)',
    // shadowOffset: {height: 3, width: 0},
  },
  navCoinCon: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navCoinText: {
    fontSize: 18,
    paddingLeft: 8,
    fontWeight: '400',
  },
  navTitleCon: {
    flex: 1,
    alignItems: 'center',
  },
  navTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  navSettingCon: {
    width: '20%',
    alignItems: 'flex-end',
  },
});
