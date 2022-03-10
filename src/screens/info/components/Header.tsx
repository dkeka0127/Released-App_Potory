import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Data
import {userinfo} from '../../../../dummyData';

function Header() {
  const navigation = useNavigation();
  return (
    <View style={styles.navContainer}>
      {/* Point */}
      <View style={styles.pointCon}>
        <Feather name="camera" size={23} color="black" />
        <Text style={styles.pointText}>25</Text>
      </View>
      {/* Title */}
      <View style={styles.navTitleCon}>
        <Text style={styles.navTitleText}>마이페이지</Text>
      </View>
      {/* Setting */}
      <TouchableOpacity
        style={styles.navSettingCon}
        onPress={() => navigation.navigate('설정')}>
        <Ionicons name="settings-outline" size={23} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  navContainer: {
    height: 55,
    paddingBottom: 3,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#eee',
    // opacity: 0.9,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  pointCon: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointText: {
    fontSize: 17,
    paddingLeft: 10,
    fontWeight: '500',
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
