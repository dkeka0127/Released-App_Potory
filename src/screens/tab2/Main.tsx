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

  // const {isScrollUp, isScrollStartReached} = useScroll();

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text>
        {item.id}
        {'\n'}
        {item.title.toUpperCase()}
        {'\n'}
        {'\n'}
        {'\n'}
      </Text>
    );
  };
  return (
    <ScrollProvider>
      <ImageBackground source={require(backgroundImg)} style={styles.container}>
        <SafeAreaView style={styles.safeAreaViewContainer}>
          {/* <ScrollHeader /> */}

          {/* header */}
          <Animated.View
            style={[
              styles.header,
              {
                transform: [{translateY: navbarTranslate}],
              },
            ]}
            onLayout={event => {
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
            }}>
            <Text style={styles.headerText}>HEADER</Text>
          </Animated.View>

          {/* content */}
          <Animated.FlatList
            style={{flexGrow: 1, width: '100%', backgroundColor: '#ffe'}}
            // contentInset={{top: HEADER_HEIGHT}}
            // contentOffset={{y: -HEADER_HEIGHT}}
            bounces={false}
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
            windowSize={15} // 초기 렌더링 개수
            data={dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            // ListEmptyComponent={EmptyListMessage}
          />
        </SafeAreaView>
      </ImageBackground>
    </ScrollProvider>
  );
}

export default React.memo(Main);

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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    backgroundColor: '#fee',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
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
