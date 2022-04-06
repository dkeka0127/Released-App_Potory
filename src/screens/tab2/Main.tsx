import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Page
import Header from './components/Header';
import Content from './components/Content';
import BottomButton from './components/BottomButton';

// Image
const backgroundImg = '../../assets/images/MainPhoto_bg.png';

function MainPhoto() {
  const [grid, setGrid] = useState(2);
  const [sequence, setSequence] = useState('new');
  const [polaroidColor, setPolaroidColor] = useState('#ddd');

  // [하위 <-> 상위] 값 전달 함수
  const gridPressed = value => {
    grid === 1 ? setGrid(2) : grid === 2 ? setGrid(3) : setGrid(1);
    return <Content grid={grid} />;
  };
  const sequencePressed = value => {
    sequence === 'new' ? setSequence('old') : setSequence('new');
    return <Content sequence={sequence} />;
  };
  const poloroidColorPressed = value => {
    polaroidColor === '#ddd'
      ? setPolaroidColor('#111')
      : setPolaroidColor('#ddd');
    return <Content polaroidColor={polaroidColor} />;
  };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  console.log(grid);
  console.log(sequence);
  console.log(polaroidColor);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      console.log(grid);
      console.log(sequence);
      console.log(polaroidColor);
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
      AsyncStorage.setItem(
        'PhotoInfo',
        JSON.stringify({
          grid: grid,
          frequency: sequence,
          polaroidColor: polaroidColor,
        }),
      );
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // 값 변경 시 AsyncStorage에 값 저장 [Grid, Frequency, PolaroidColor]
  // useEffect(() => {
  //   AsyncStorage.setItem(
  //     'PhotoInfo',
  //     JSON.stringify({
  //       grid: grid,
  //       frequency: sequence,
  //       polaroidColor: polaroidColor,
  //     }),
  //   );
  //   console.log('!!!!!!!!!!');
  // }, [AppState.currentState]);

  // 화면 첫 시작 시 AsyncStorage의 값 불러오기
  useEffect(() => {
    const PhotoInfoSetting = async () => {
      const PhotoInfoData = await AsyncStorage.getItem('PhotoInfo');

      const PhotoInfo = JSON.parse(PhotoInfoData);
      console.log('==========', PhotoInfo);

      setGrid(PhotoInfo.grid === null ? 2 : PhotoInfo.grid);
      setSequence(PhotoInfo.frequency === null ? 'new' : PhotoInfo.frequency);
      setPolaroidColor(
        PhotoInfo.polaroidColor === null ? '#ddd' : PhotoInfo.polaroidColor,
      );
    };

    PhotoInfoSetting();
  }, []);

  return (
    <ImageBackground source={require(backgroundImg)} style={styles.container}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <Header
          gridPressed={gridPressed}
          sequencePressed={sequencePressed}
          poloroidColorPressed={poloroidColorPressed}
        />
        <Content
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
