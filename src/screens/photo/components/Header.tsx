import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Awesome5Icons from 'react-native-vector-icons/FontAwesome5';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Header(props) {
  return (
    <View style={styles.headerContainer}>
      {/* Header - Title */}
      {/* <Image
        style={{width: 85, marginTop: 4, marginLeft: -8}}
        resizeMode="contain"
        source={require('../../../assets/images/logo.png')}
      /> */}
      {/* <View style={styles.headerTitle}>
        <Text style={styles.headerTitleTextKo}>포토리</Text>
        <Text style={styles.headerTitleTextEng}>photo in memory</Text>
      </View> */}
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleTextEng}>Photo In Memory</Text>
      </View>

      <View style={styles.headerImgContainer}>
        {/* Header - Grid */}
        <TouchableOpacity
          style={styles.headerButtonContent}
          onPress={() => {
            props.gridPressed(true);
          }}>
          <CommunityIcons
            style={styles.headerGridImg}
            name={'grid-large'}
            size={18}
            color={'black'}
          />
        </TouchableOpacity>
        {/* Header - sequence */}
        <TouchableOpacity
          style={styles.headerButtonContent}
          onPress={() => {
            props.sequencePressed(true);
          }}>
          <Awesome5Icons
            style={styles.headerArrowImg}
            name={'arrows-alt-v'}
            size={17}
            color={'black'}
          />
        </TouchableOpacity>
        {/* Header - color */}
        <TouchableOpacity
          style={styles.headerButtonContent}
          onPress={() => {
            props.poloroidColorPressed(true);
          }}>
          <Feather
            style={styles.headerColorImg}
            name={'tool'}
            size={20}
            color={'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    paddingTop: 9,
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    height: '100%',
    justifyContent: 'center',
  },
  headerTitleTextKo: {
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 6,
  },
  headerTitleTextEng: {
    fontSize: 15,
    fontWeight: '300',
  },
  headerImgContainer: {
    flexDirection: 'row',
  },
  headerButtonContent: {
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#eee',
    // 그림자
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  headerGridImg: {
    // paddingTop: 7,
    // paddingBottom: 7,
    paddingLeft: 11,
    paddingRight: 11,
  },
  headerArrowImg: {
    // paddingTop: 9,
    // paddingBottom: 9,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerColorImg: {
    // paddingTop: 9,
    // paddingBottom: 9,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
