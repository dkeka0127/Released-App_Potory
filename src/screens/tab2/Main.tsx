// React & Package
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// custom component
import Loading from '../../components/Loading';
import PhotoModal from './components/PhotoModal';
import ScrollHeader from './components/ScrollHeader';
import EmptyDataScreen from './container/EmptyDataScreen';
import AddContentButton from './components/AddContentButton';

// api
import {api_getPhotoList} from 'core/api/Module';

// variable
const HEADER_HEIGHT = 80;
const deviceWidth = Dimensions.get('window').width;
import {polaroid_gray, polaroid_black} from '../../core/Polaroid';

interface AsyncProps {
  grid: number;
  sequence: string;
  bgColor: string;
}

function Main() {
  const [photoListData, setPhotoListData] = useState<any>([]);
  const polaroidSortRandomly = photoListData.map(() => {
    return Math.floor(Math.random() * 12); // 폴라로이드 랜덤 배정
  });

  // scroll header variable
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

  const [modalImageInfo, setModalImageInfo] = useState();
  const [isModalShown, setIsModalShown] = useState(false);
  const polaroidWidth = (deviceWidth - flatListPadding * 2) / grid;

  // useEffect
  useEffect(() => {
    connectAPI();
  }, []);

  useEffect(() => {
    if (isModalShown) setIsModalShown(false);
  }, [isModalShown]);

  // api
  const connectAPI = () => {
    api_getPhotoList(8)
      .then(res => {
        setPhotoListData(res.data.data);
        console.log('get photo list Success == ');
      })
      .catch(err => {
        console.log('get photo list Err == ', err);
      });

    return;
  };

  // function
  const gridPress = (value: number) => setGrid(value);

  const sequencePress = (value: string) => setSequence(value);

  const bgColorPress = (value: string) => setBgColor(value);

  const initialAsyncValue = (value: AsyncProps) => {
    setGrid(value.grid);
    setSequence(value.sequence);
    setBgColor(value.bgColor);
  };

  const actionForScrollTop = () =>
    flatListRef.current.scrollToOffset({animated: true, offset: 0});

  const headerScrollEvent = (event: LayoutChangeEvent) => {
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

  const imageDeletedFromModal = () => {
    connectAPI(); // api refetch because image deleted
    console.log('-- imageDeleted --');
  };

  const RenderItem = ({item, index}: any) => {
    return (
      <>
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
              setModalImageInfo(photoListData[index]);
            }}>
            <FastImage
              resizeMode="contain"
              source={{uri: photoListData[index].photo_url}}
              style={renderItem.photo}
            />
          </TouchableOpacity>
        </FastImage>
        {index === photoListData.length - 1 && (
          <View
            style={{
              width: polaroidWidth,
              height: grid !== 1 ? polaroidWidth * 1.18 : 0,
              marginBottom: 100,
            }}
          />
        )}
      </>
    );
  };

  //
  //
  //

  if (photoListData === []) return <Loading />;

  return (
    <View style={styles.container}>
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
        key={grid}
        ref={flatListRef}
        renderItem={RenderItem}
        style={styles.flatList}
        bounces={false}
        numColumns={grid} // grid 개수
        windowSize={15} // 추가 렌더링 개수
        initialNumToRender={10} // 초기 랜더링 개수
        keyExtractor={item => item.photo_idx}
        data={sequence === 'new' ? photoListData : photoListData.reverse()}
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
      <PhotoModal
        isModalShown={isModalShown}
        modalImageInfo={modalImageInfo}
        imageDeletedFromModal={imageDeletedFromModal}
      />

      {/*======================= Footer =======================*/}
      <AddContentButton />
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
    backgroundColor: '#f9f7ff',
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
