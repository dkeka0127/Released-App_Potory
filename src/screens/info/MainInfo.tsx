import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CoinIcon from 'react-native-vector-icons/FontAwesome5';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import PictureIcon from 'react-native-vector-icons/AntDesign';

// Page
import dummyData from '../../../dummyData';

// [height] User Name Section
const nameContainerHeight = 60;

function MainInfo() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Nav */}
      <View style={styles.navContainer}>
        <View style={styles.navPictureCon}>
          <CoinIcon name="coins" size={15} color="black" />
          <Text style={styles.navPictureText}>{dummyData.point}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <SettingIcon name="settings-outline" size={23} color="black" />
        </TouchableOpacity>
      </View>

      {/* My Info */}
      {/* <View style={styles.infoContainer}>
        <View style={styles.infoContent}></View>
        <View style={styles.nameContainer}>
          <Text> </Text>
          <Text style={styles.nameText}>{dummyData.userName}</Text>
          <Text style={styles.nameText}> 님</Text>
        </View>
      </View> */}

      {/* bottom */}
      {/* <View style={styles.bottomContainer}>
        <View style={styles.bottomList}>
          <Text>master : 기록된 추억</Text>
        </View>
        <View style={styles.bottomList}>
          <Text>Gold : 기여한 기록장</Text>
        </View>
        <View style={styles.bottomList}>
          <Text>Sliver : 기록된 추억</Text>
        </View>
        <View style={styles.bottomList}>
          <Text> Bronze : 기록된 추억</Text>
        </View>
      </View> */}
    </SafeAreaView>
  );
}

export default MainInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navContainer: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navPictureCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navPictureText: {
    fontSize: 18,
    paddingLeft: 8,
    fontWeight: '400',
  },
  infoContainer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  // User Picture Section
  infoContent: {
    width: 280,
    height: 245,
    borderColor: '#333333',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderBottomWidth: nameContainerHeight,
    backgroundColor: '#ffffff',
  },
  // User Name Section
  nameContainer: {
    marginTop: -nameContainerHeight,
    width: 250,
    height: nameContainerHeight,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  bottomContent: {
    marginTop: 50,
    width: 250,
    height: 220,
    borderColor: '#333333',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderBottomWidth: 50,
    backgroundColor: '#ffffff',
  },
  bottomList: {
    width: 280,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#cccccc',
  },
});
