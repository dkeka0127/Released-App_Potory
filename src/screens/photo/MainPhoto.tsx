import React, {useEffect, useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';

// Page
import Header from './components/Header';
import Content from './components/Content';
import Content1 from './components/Content1';
import BottomButton from './components/BottomButton';
// Data
// import {photoList} from '../../../dummyData';
// Image
const backgroundImg = '../../assets/images/MainPhoto_bg.png';

function MainPhoto() {
  const [grid, setGrid] = useState(2);
  const [sequence, setSequence] = useState('new');
  const [polaroidColor, setPolaroidColor] = useState('#ddd');
  const gridPressed = value => {
    grid === 1 ? setGrid(2) : grid === 2 ? setGrid(3) : setGrid(1);
    return <Content1 grid={grid} />;
  };
  const sequencePressed = value => {
    sequence === 'new' ? setSequence('old') : setSequence('new');
    return <Content1 sequence={sequence} />;
  };
  const poloroidColorPressed = value => {
    polaroidColor === '#ddd'
      ? setPolaroidColor('#111')
      : setPolaroidColor('#ddd');
    return <Content1 polaroidColor={polaroidColor} />;
  };
  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <Header
          gridPressed={gridPressed}
          sequencePressed={sequencePressed}
          poloroidColorPressed={poloroidColorPressed}
        />
        {/* <Content photoList={photoList} grid={grid} sequence={sequence} /> */}
        <Content1
          grid={grid}
          sequence={sequence}
          polaroidColor={polaroidColor}
        />
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
