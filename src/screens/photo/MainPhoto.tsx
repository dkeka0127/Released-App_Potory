import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';

// Page
import Header from './components/Header';
import Content from './components/Content';
import Content1 from './components/Content1';
import Content2 from './components/Content2';
import Content3 from './components/Content3';
import BottomButton from './components/BottomButton';

// Image
const backgroundImg = '../../assets/images/MainPhoto_bg.png';

function MainPhoto() {
  const [grid, setGrid] = useState(2);
  const gridPressed = value => {
    console.log('Grid Buttin is Pressed');
    grid === 1 ? setGrid(2) : grid === 2 ? setGrid(3) : setGrid(1);
  };
  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <Header gridPressed={gridPressed} />
        {grid === 1 ? <Content1 /> : grid === 2 ? <Content2 /> : <Content3 />}
        {/* <Content /> */}
        <BottomButton />
      </SafeAreaView>
    </ImageBackground>
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
});
