// React & Package
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// custom component
import ScrollHeader from './components/ScrollHeader';
import EmptyDataScreen from './container/EmptyDataScreen';
import AddContentButton from './components/AddContentButton';
import FlatListRenderItem from './components/FlatListRenderItem';
import PhotoModal from './components/PhotoModal';

// image
const backgroundImg = '../../assets/images/background/tab2_main_bg.jpg';

// variable
const HEADER_HEIGHT = 80;
const deviceWidth = Dimensions.get('window').width;
import {polaroid_gray, polaroid_black} from '../../core/Polaroid';
import Loading from '../../components/Loading';
const photoData = [
  {uri: require('../../assets/images/user/image1.png')},
  {uri: require('../../assets/images/user/image2.png')},
  {uri: require('../../assets/images/user/image3.png')},
  {uri: require('../../assets/images/user/image4.png')},
  {uri: require('../../assets/images/user/image5.png')},
  {uri: require('../../assets/images/user/image1.png')},
  {uri: require('../../assets/images/user/image2.png')},
  {uri: require('../../assets/images/user/image3.png')},
  {uri: require('../../assets/images/user/image4.png')},
  {uri: require('../../assets/images/user/image5.png')},
  {uri: require('../../assets/images/user/image1.png')},
  {uri: require('../../assets/images/user/image2.png')},
  {uri: require('../../assets/images/user/image3.png')},
  {uri: require('../../assets/images/user/image4.png')},
  {uri: require('../../assets/images/user/image3.png')},
  {uri: require('../../assets/images/user/image4.png')},
  {uri: require('../../assets/images/user/image5.png')},
  {uri: require('../../assets/images/user/image1.png')},
  {uri: require('../../assets/images/user/image2.png')},
  {uri: require('../../assets/images/user/image3.png')},
  {uri: require('../../assets/images/user/image4.png')},
  {uri: require('../../assets/images/user/image3.png')},
  {uri: require('../../assets/images/user/image4.png')},
  {uri: require('../../assets/images/user/image5.png')},
];

// 폴라로이드 랜덤 정렬
const polaroidArr = photoData.map(() => {
  return Math.floor(Math.random() * 12);
});

function Main() {
  // header scroll
  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim,
      ),
      0,
      1,
    ),
  );
  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT * 2],
    extrapolate: 'clamp',
  });

  // async tools
  const [grid, setGrid] = useState<number>(2);
  const [sequence, setSequence] = useState<string>();
  const [bgColor, setBgColor] = useState<string>();

  const [isModal, setIsModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState(false);
  const polaroidWidth = (deviceWidth - flatListPadding * 2) / grid;

  // [tool] 상/하위 값 전달 F
  const gridPress = value => setGrid(value);
  const sequencePress = value => setSequence(value);
  const bgColorPress = value => setBgColor(value);

  // 초기 async 값
  const initToolValue = value => {
    setGrid(value.grid);
    setSequence(value.sequence);
    setBgColor(value.bgColor);
  };

  // [Header] Scroll Event Function
  const scrollHeaderF = event => {
    let {height} = event.nativeEvent.layout;
    setClampedScroll(
      Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        height,
      ),
    );
  };

  const RenderItem = ({item, index}) => {
    return (
      <>
        <FastImage
          resizeMode="contain"
          source={
            bgColor === '#111'
              ? polaroid_black[polaroidArr[index]].uri
              : polaroid_gray[polaroidArr[index]].uri
          }
          style={[
            renderItem.container,
            {
              width: polaroidWidth,
              height: polaroidWidth * 1.18,
              marginBottom: index === photoData.length - 1 && 100,
            },
          ]}>
          <TouchableOpacity
            style={{
              marginTop: -(polaroidWidth * 0.14),
              marginLeft: -3,
              width: polaroidWidth * 0.55,
              height: polaroidWidth * 0.5,
            }}
            onPress={() => {
              setIsModal(true);
              setModalImgUrl(item.imageuri);
              console.log(photoData);
              console.log(index);
            }}>
            <FastImage
              resizeMode="contain"
              source={photoData[index].uri}
              style={renderItem.photo}
            />
          </TouchableOpacity>
        </FastImage>
      </>
    );
  };

  useEffect(() => {
    if (isModal) setIsModal(false);
  }, [isModal]);

  //
  //
  //

  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      {/*======================= header =======================*/}
      <Animated.View
        style={[styles.header, {transform: [{translateY: navbarTranslate}]}]}
        onLayout={event => scrollHeaderF(event)}>
        <ScrollHeader
          initToolValue={initToolValue}
          gridPress={gridPress}
          sequencePress={sequencePress}
          bgColorPress={bgColorPress}
        />
      </Animated.View>

      {/*======================= content =======================*/}
      <Animated.FlatList
        key={grid}
        numColumns={grid} // grid 개수
        style={styles.flatList}
        windowSize={15}
        bounces={false}
        data={photoData}
        initialNumToRender={15}
        renderItem={RenderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={EmptyDataScreen}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollAnim},
              },
            },
          ],
          {useNativeDriver: true},
        )}
      />
      <PhotoModal isModal={isModal} modalImgUrl={modalImgUrl} />

      {/* <View style={{width: '100%', height: 200, backgroundColor: 'green'}} /> */}

      {/*======================= Footer =======================*/}
      <AddContentButton />
    </ImageBackground>
  );
}

// export default React.memo(Main);
export default Main;

const flatListPadding = 15;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 7,
  },
  safeAreaViewContainer: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    paddingTop: 10,
    height: HEADER_HEIGHT,
    zIndex: 999,
  },
  flatList: {
    paddingTop: HEADER_HEIGHT,
    paddingLeft: flatListPadding,
    paddingRight: flatListPadding,
  },
});

const renderItem = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    flex: 1,
  },
});
