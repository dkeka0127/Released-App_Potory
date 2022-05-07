// React & Package
import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// custom component
import Loading from '../../components/Loading';
import PhotoModal from './components/PhotoModal';
import ScrollHeader from './components/ScrollHeader';
import EmptyDataScreen from './container/EmptyDataScreen';
import AddContentButton from './components/AddContentButton';

// image
const backgroundImg = '../../assets/images/background/tab2_main_bg.jpg';

// variable
const HEADER_HEIGHT = 80;
const deviceWidth = Dimensions.get('window').width;
import {polaroid_gray, polaroid_black} from '../../core/Polaroid';
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
  {uri: require('../../assets/images/user/image4.png')},
];

// 폴라로이드 랜덤 정렬
const polaroidSortRandomly = photoData.map(() => {
  return Math.floor(Math.random() * 12);
});

function Main() {
  // scrolling header variable
  const flatListRef = useRef<any>(true);
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

  // async variable
  const [grid, setGrid] = useState<number>(2);
  const [sequence, setSequence] = useState<string>();
  const [bgColor, setBgColor] = useState<string>();

  const [modalImgPath, setModalImgPath] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const polaroidWidth = (deviceWidth - flatListPadding * 2) / grid;

  // function
  const gridPress = value => setGrid(value);

  const sequencePress = value => setSequence(value);

  const bgColorPress = value => setBgColor(value);

  const actionForScrollTop = () => {
    console.log('Action for Scroll Top is Clicked');
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const initialAsyncValue = value => {
    setGrid(value.grid);
    setSequence(value.sequence);
    setBgColor(value.bgColor);
  };

  const headerScrollEvent = event => {
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

  console.log(modalImgPath);
  const RenderItem = ({item, index}) => {
    return (
      <FastImage
        resizeMode="contain"
        source={
          bgColor === '#111'
            ? polaroid_black[polaroidSortRandomly[index]].uri
            : polaroid_gray[polaroidSortRandomly[index]].uri
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
            setIsModalShown(true);
            setModalImgPath(photoData[index].uri);
          }}>
          <FastImage
            resizeMode="contain"
            source={photoData[index].uri}
            style={renderItem.photo}
          />
        </TouchableOpacity>
      </FastImage>
    );
  };

  // useEffect
  useEffect(() => {
    if (isModalShown) setIsModalShown(false);
  }, [isModalShown]);

  //
  //
  //

  return (
    // <ImageBackground source={require(backgroundImg)} style={styles.container}>
    <View style={[styles.container, {backgroundColor: '#f9f7ff'}]}>
      {/*======================= header =======================*/}
      <Animated.View
        style={[styles.header, {transform: [{translateY: navbarTranslate}]}]}
        onLayout={event => headerScrollEvent(event)}>
        <ScrollHeader
          initialAsyncValue={initialAsyncValue}
          gridPress={gridPress}
          sequencePress={sequencePress}
          bgColorPress={bgColorPress}
          actionForScrollTop={actionForScrollTop}
        />
      </Animated.View>

      {/*======================= content =======================*/}
      <Animated.FlatList
        ref={flatListRef}
        style={styles.flatList}
        renderItem={RenderItem}
        key={grid}
        numColumns={grid} // grid 개수
        windowSize={15}
        bounces={false}
        data={sequence === 'new' ? photoData : photoData.reverse()}
        initialNumToRender={15}
        ListEmptyComponent={EmptyDataScreen}
        keyExtractor={(item, index) => index.toString()}
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
      <PhotoModal isModalShown={isModalShown} modalImgPath={modalImgPath} />

      {/* <View style={{width: '100%', height: 200, backgroundColor: 'green'}} /> */}

      {/*======================= Footer =======================*/}
      <AddContentButton />
      {/* </ImageBackground> */}
    </View>
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
