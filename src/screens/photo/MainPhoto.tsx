import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// Icons
import Awesome5Icons from 'react-native-vector-icons/FontAwesome5';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Page
import Header from './components/Header';
import Content from './components/Content';
import BottomButton from './components/BottomButton';
// Variable
const backgroundImg = '../../assets/images/MainPhoto_bg.png';

function MainPhoto() {
  return (
    <>
      <ImageBackground source={require(backgroundImg)} style={styles.container}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <Header />
          <Content />
          <BottomButton />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

export default MainPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  safeAreaViewContainer: {
    flex: 1,
  },
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

// ImageBackground
// ├── Header
// │   ├── title
// │   ├── Grid Button
// │   └── 시간 순 Button
// │
// ├── Container
// │   └── 폴라로이드
// │       ├── 이미지
// │       │   └── !확대 모달창
// │       └── 날짜
// │
// └── My Location
