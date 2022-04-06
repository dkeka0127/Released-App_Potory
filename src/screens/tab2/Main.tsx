import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import ScrollHeader from './components/ScrollHeader';
import ScrollProvider, {useScroll} from '../common/scroll/ScrollProvider';
import EmptyDataScreen from './container/EmptyDataScreen';
import FlatListRenderItem from './components/FlatListRenderItem';

// Image
const backgroundImg = '../../assets/images/MainPhoto_bg.png';
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

const HEADER_HEIGHT = 50;

function Main() {
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

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text>
        {item.id}
        {'\n'}
        {item.title.toUpperCase()}
        {'\n'}
        {'\n'}
      </Text>
    );
  };

  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        {/* <ScrollHeader /> */}

        {/* header */}
        <Animated.View
          style={[styles.header, {transform: [{translateY: navbarTranslate}]}]}
          onLayout={event => scrollHeaderF(event)}>
          <ScrollHeader />
        </Animated.View>

        {/* content */}
        <Animated.FlatList
          style={styles.flatList}
          windowSize={15}
          bounces={false}
          data={dataSource}
          renderItem={FlatListRenderItem}
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
      </SafeAreaView>
    </ImageBackground>
  );
}

// export default React.memo(Main);
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
  },
  safeAreaViewContainer: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    height: 50,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee',
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
    paddingTop: 50,
    backgroundColor: '#ffe',
  },
});

const header = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    zIndex: 999,
    width: '100%',
    height: 50,
    backgroundColor: '#fee',
  },
  content: {
    fontSize: 30,
  },
});
