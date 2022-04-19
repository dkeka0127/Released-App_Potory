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
} from 'react-native';

// custom component
import ScrollHeader from './components/ScrollHeader';
import EmptyDataScreen from './container/EmptyDataScreen';
import AddContentButton from './components/AddContentButton';
import FlatListRenderItem from './components/FlatListRenderItem';

// image
const backgroundImg = '../../assets/images/background/tab2_main_bg.jpg';

const polaroid1 = require('../../assets/images/polaroid/black_1_1.png');

// variable
const HEADER_HEIGHT = 60;
const deviceWidth = Dimensions.get('window').width;
const dataSource = [
  {id: 1, title: 'Button'},
  {id: 2, title: 'Card'},
  {id: 3, title: 'Input'},
  {id: 4, title: 'Avatar'},
  {id: 5, title: 'CheckBox'},
  {id: 6, title: 'Header'},
  {id: 7, title: 'Icon'},
  {id: 8, title: 'Lists'},
  {id: 9, title: 'Rating'},
  {id: 10, title: 'Pricing'},
  {id: 11, title: 'Avatar'},
  {id: 12, title: 'CheckBox'},
  {id: 13, title: 'Header'},
  {id: 14, title: 'Icon'},
  {id: 15, title: 'Lists'},
  {id: 16, title: 'Rating'},
  {id: 17, title: 'Pricing'},
  {id: 18, title: 'Icon'},
  {id: 19, title: 'Lists'},
  {id: 26, title: 'Rating'},
  {id: 27, title: 'Pricing'},
];

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

  // [tool] 상/하위 값 전달 F
  const gridPress = value => setGrid(value);
  const sequencePress = value => setSequence(value);
  const bgColorPress = value => setBgColor(value);

  // 초기 async 값 받아옴
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

  const RenderItem = item => {
    return (
      <>
        <ImageBackground
          resizeMode="contain"
          source={polaroid1}
          style={{
            justifyContent: 'center',
            width: (deviceWidth - flatListMargin * 2) / grid,
            height: ((deviceWidth - flatListMargin * 2) / grid) * 1.2,
            marginBottom: item.index === dataSource.length - 1 && 60,
          }}
        />
      </>
    );
  };

  //
  //
  //

  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
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
          data={dataSource}
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
        {/* <View style={{width: '100%', height: 200, backgroundColor: 'green'}} /> */}

        {/*======================= Footer =======================*/}
        <AddContentButton />
      </SafeAreaView>
    </ImageBackground>
  );
}

// export default React.memo(Main);
export default Main;

const flatListMargin = 15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  safeAreaViewContainer: {
    // flex: 1,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 999,
  },
  flatList: {
    // flexGrow: 1,
    // width: '100%',
    paddingTop: HEADER_HEIGHT,
    marginLeft: flatListMargin,
    marginRight: flatListMargin,
  },
});
