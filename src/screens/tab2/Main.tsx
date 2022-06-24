/* React & Package */
import React, {useRef, useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';

/* custom components */
import Toast from 'components/Toast/Toast';
import Loading from '../../components/Loading';
import PhotoModal from './components/PhotoModal';
import ScrollHeader from './components/ScrollHeader';
import EmptyDataScreen from './container/EmptyDataScreen';
import AddContentButton from './components/AddContentButton';

/* api */
import {api_getPhotoList} from '../../core/api/Module';

// variable
const HEADER_HEIGHT = 80;
const deviceWidth = Dimensions.get('window').width;
import {getAsyncStorage_userIdx} from '../../core/UserInfo';
import {polaroid_gray, polaroid_black} from '../../core/Polaroid';

interface AsyncProps {
  grid: number;
  sequence: string;
  bgColor: string;
}

function Main() {
  const [photoListData, setPhotoListData] = useState<any>([]);
  let [photoListArr, setPhotoListArr] = useState([]);
  // const polaroidSortRandomly = photoListData.map(() => {
  //   return Math.floor(Math.random() * 12); // 폴라로이드 랜덤 배정
  // });

  const [userIdx, setUseIdx] = useState<any>();
  getAsyncStorage_userIdx().then(res => setUseIdx(res));

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

  useFocusEffect(
    React.useCallback(() => {
      if (userIdx) connectAPI();
    }, [userIdx]),
  );

  useEffect(() => {
    let a: any = [];
    if (photoListData.length !== 0) {
      photoListData.map(() => {
        a.push(Math.floor(Math.random() * 12));
      });
      setPhotoListArr(a);
    }
  }, [photoListData, grid, bgColor]);

  useEffect(() => {
    if (isModalShown) setIsModalShown(false);
    else return;
  }, [isModalShown]);

  // api

  const connectAPI = () => {
    api_getPhotoList(userIdx)
      .then(res => {
        setPhotoListData(res.data.data);
        console.log('get photo list Success == ');
      })
      .catch(err => {
        console.log('get photo list Err == ', err);
        Toast.show(
          '사진을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.',
        );
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

  const keyExtractor = useCallback(item => item.photo_idx, []);

  const useCallbackRenderItem = useCallback(
    ({item, index}) => {
      console.log(
        '\n..................photoListArr, photoListData.length',
        photoListArr,
        photoListData.length,
      );
      return (
        <>
          <FastImage
            resizeMode="contain"
            source={
              bgColor === '#111'
                ? polaroid_black[photoListArr[index]].uri
                : polaroid_gray[photoListArr[index]].uri
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
                setModalImageInfo(item);
              }}>
              <FastImage
                resizeMode="contain"
                source={{uri: item.photo_url}}
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
    },
    [photoListArr],
  );

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

      {photoListArr.length === photoListData.length && (
        <Animated.FlatList
          key={grid}
          ref={flatListRef}
          renderItem={useCallbackRenderItem}
          style={styles.flatList}
          bounces={false}
          numColumns={grid} // grid 개수
          windowSize={12} // 추가 렌더링 개수
          initialNumToRender={15} // 초기 랜더링 개수
          // maxToRenderPerBatch={15} // 스크롤 시 렌더링 할 항목 (기본값 10)
          keyExtractor={keyExtractor}
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
      )}

      {/*======================== modal ========================*/}

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

export default React.memo(Main);
// export default Main;

const flatListPadding = 15;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 15,
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
    zIndex: 1,
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

// const RenderItem = ({item, index}: any) => {
//   return (
//     <>
//       <FastImage
//         resizeMode="contain"
//         source={
//           bgColor === '#111'
//             ? polaroid_black[photoListArr[index]].uri
//             : polaroid_gray[photoListArr[index]].uri
//         }
//         style={[
//           renderItem.container,
//           {
//             width: polaroidWidth,
//             height: polaroidWidth * 1.18,
//           },
//         ]}>
//         <TouchableOpacity
//           style={{
//             marginTop: -(polaroidWidth * 0.14),
//             marginLeft: -3,
//             width: polaroidWidth * 0.55,
//             height: polaroidWidth * 0.5,
//           }}
//           onPress={() => {
//             setIsModalShown(true);
//             setModalImageInfo(item);
//           }}>
//           <FastImage
//             resizeMode="contain"
//             source={{uri: item.photo_url}}
//             style={renderItem.photo}
//           />
//         </TouchableOpacity>
//       </FastImage>
//       {index === photoListData.length - 1 && (
//         <View
//           style={{
//             width: polaroidWidth,
//             height: grid !== 1 ? polaroidWidth * 1.18 : 0,
//             marginBottom: 100,
//           }}
//         />
//       )}
//     </>
//   );
// };
