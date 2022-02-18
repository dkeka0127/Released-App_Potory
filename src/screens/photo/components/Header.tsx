import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import Awesome5Icons from 'react-native-vector-icons/FontAwesome5';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* Header - Title */}
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleTextKo}>포토리</Text>
        <Text style={styles.headerTitleTextEng}>photo in memory</Text>
      </View>

      <View style={styles.headerImgContainer}>
        {/* Header - Grid */}
        <TouchableOpacity
          style={styles.headerGridContent}
          onPress={() => DeviceEventEmitter.emit('gridChanged')}>
          <CommunityIcons
            style={styles.headerGridImg}
            name={'grid-large'}
            size={18}
            color={'black'}
          />
        </TouchableOpacity>
        {/* Header - Date */}
        <TouchableOpacity style={styles.headerGridContent}>
          <Awesome5Icons
            style={styles.headerArrowImg}
            name={'arrows-alt-v'}
            size={17}
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
    fontSize: 14,
    fontWeight: '300',
  },
  headerImgContainer: {
    flexDirection: 'row',
  },
  headerGridContent: {
    height: '100%',
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 11,
    paddingRight: 11,
  },
  headerArrowImg: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
