import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  DeviceEventEmitter,
  ImageBackground,
} from 'react-native';

import {polaroid} from '../../../../dummyData';
import {photoList} from '../../../../dummyData';
const margin = 7; // 전체 Container의 양 옆 여백 값

const deviceWidth = Dimensions.get('window').width;

interface Props {
  // photoList?: any;
  grid?: number;
  sequence?: string;
  polaroidColor?: string;
}

function Content(props: Props) {
  const photoListData = useRef(photoList); // Image Data
  const [grid, setGrid] = useState(props.grid); // Grid
  const [sequence, setSequence] = useState(props.sequence); // Sequence
  const [polaroidColor, setPolaroidColor] = useState(props.polaroidColor);
  const polaroidNum = useRef(-1); // MaskingTape
  const polaroidArr = photoListData.current.map(() => {
    // MaskingTape
    return Math.floor(Math.random() * 8); // 마스킹테이프 랜덤 지정
  });
  // grid
  useEffect(() => {
    if (grid === props.grid) return;
    setGrid(props.grid);
  }, [props.grid]);
  // sequence
  useEffect(() => {
    if (sequence === props.sequence) return;
    setSequence(props.sequence);
    photoListData.current = photoList.reverse();
  }, [props.sequence]);
  // polaroid Color
  useEffect(() => {
    if (polaroidColor === props.polaroidColor) return;
    setPolaroidColor(props.polaroidColor);
  }, [props.polaroidColor]);

  const Images = ({item}) => {
    polaroidNum.current++;
    return (
      <View
        style={{
          width: (deviceWidth - margin * 2) / grid,
          height: ((deviceWidth - margin * 2) / grid) * 1.3,
          padding: grid === 1 ? '12%' : grid === 2 ? '6%' : '5%', // 폴라로이드 크기를 조절하는 상위 padding
        }}>
        <ImageBackground
          source={polaroid[polaroidArr[polaroidNum.current]]} // 마스킹테이프 디자인을 랜덤 세팅
          style={{
            width: '100%',
            height: '100%',
          }}>
          <TouchableOpacity
            style={{
              marginTop: '22%',
              marginLeft: '14%',
              width: '72%',
              height: '55%',
              backgroundColor: polaroidColor,
              borderRadius: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={[
                styles.image,
                {
                  width: (deviceWidth / grid) * 0.7,
                  height:
                    grid === 1
                      ? (deviceWidth / grid) * 0.55
                      : (deviceWidth / grid) * 0.62,
                },
              ]}
              source={item.imageuri}
            />
          </TouchableOpacity>
          <View style={styles.textBackground}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: grid === 1 ? 17 : grid === 2 ? 13.5 : 12,
                },
              ]}>
              {item.date}
            </Text>
          </View>
        </ImageBackground>

        {/* <TouchableOpacity style={styles.imageBackground}>
          <Image
            style={[
              styles.image,
              {
                width: (deviceWidth / grid) * 0.7,
                height:
                  grid === 1
                    ? (deviceWidth / grid) * 0.63
                    : (deviceWidth / grid) * 0.7,
              },
            ]}
            source={item.imageuri}
          />
        </TouchableOpacity>
        <View style={styles.textBackground}>
          <Text
            style={[
              styles.text,
              {
                fontSize: grid === 1 ? 16 : grid === 2 ? 13 : 11.5,
              },
            ]}>
            {item.date}
          </Text>
        </View> */}
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={photoListData.current}
      initialNumToRender={15}
      renderItem={data => Images(data)}
      keyExtractor={item => item.date}
    />
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fee',
    //   }}>
    //   <View></View>
    //   <ImageBackground
    //     source={require(Polaroid)}
    //     style={{
    //       width: '50%',
    //       height: '50%',
    //       backgroundColor: 'pink',
    //     }}></ImageBackground>
    // </View>
  );
}

export default Content;

const styles = StyleSheet.create({
  flatListContainer: {
    margin: margin,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    // width: (deviceWidth - margin * 2) / grid,
    // height: ((deviceWidth - margin * 2) / grid) * 1.15,
    // padding: grid === 1 ? '13%' : grid === 2 ? '8%' : '7%', // 폴라로이드 크기를 조절하는 상위 padding
    // backgroundColor: '#ccc',
    // borderWidth: 1,
  },
  imageSection: {
    width: '100%',
    height: '100%',
    // padding: grid === 1 ? 12 : grid === 2 ? 8 : 6, // 폴라로이드 padding
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // 그림자
    elevation: 4,
    shadowRadius: 6,
    shadowOpacity: 0.3,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  imageBackground: {
    width: '100%',
    height: '77%', // text 높이를 제외한 퍼센트
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  image: {
    resizeMode: 'contain',
    // width: (deviceWidth / grid) * 0.7,
    // height:
    //   grid === 1 ? (deviceWidth / grid) * 0.63 : (deviceWidth / grid) * 0.7,
  },
  textBackground: {
    height: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fee',
  },
  text: {
    // fontSize: grid === 1 ? 16 : grid === 2 ? 13 : 11.5,
    color: '#333',
    fontWeight: '700',
  },
});
