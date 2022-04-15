// React & Package
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

// custom component
import PhotoModal from './PhotoModal';

// variale
const margin = 7; // 전체 화면의 양 옆 여백 값
const deviceWidth = Dimensions.get('window').width;

// data
import {photoList} from '../../../../dummyData';
const polaroid = [
  {
    uri: require('../../../assets/images/polaroid/pink_one_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/purple_one_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/skyblue_one_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/yellow_one_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/green_one_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/pink_two_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/skyblue_two_.png'),
  },
  {
    uri: require('../../../assets/images/polaroid/yellow_two_.png'),
  },
];

interface Props {
  grid?: number;
  sequence?: string;
  polaroidColor?: string;
}

// 마스킹테이프 랜덤 배열
const polaroidArr = photoList.map(() => {
  return Math.floor(Math.random() * 8);
});

function Content(props: Props) {
  const [grid, setGrid] = useState(props.grid);
  const [sequence, setSequence] = useState(props.sequence);
  const [polaroidColor, setPolaroidColor] = useState(props.polaroidColor);

  const polaroidNum = useRef(-1);
  const photoListData = useRef(photoList);

  const [isModal, setIsModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState(false);

  // set Grid
  useEffect(() => {
    if (grid === props.grid) return;
    setGrid(props.grid);
  }, [props.grid]);

  // set Sequence
  useEffect(() => {
    if (sequence === props.sequence) return;
    setSequence(props.sequence);
    photoListData.current = photoList.reverse();
  }, [props.sequence]);

  // set Polaroid_BgColor
  useEffect(() => {
    if (polaroidColor === props.polaroidColor) return;
    setPolaroidColor(props.polaroidColor);
  }, [props.polaroidColor]);

  useEffect(() => {
    if (isModal) setIsModal(false);
  }, [isModal]);

  // 각각의 이미지
  const Images = ({index, item}) => {
    console.log(polaroidArr);
    polaroidNum.current++;
    return (
      <View
        style={{
          width: (deviceWidth - margin * 2) / grid,
          height: ((deviceWidth - margin * 2) / grid) * 1.3,
          padding: grid === 1 ? '12%' : grid === 2 ? '6%' : '5%', // 폴라로이드 크기를 조절하는 상위 padding
        }}>
        <ImageBackground
          source={polaroid[polaroidArr[index]].uri} // 마스킹테이프 디자인을 랜덤 세팅
          style={styles.imageContainer}>
          <TouchableOpacity
            style={[styles.imageSection, {backgroundColor: polaroidColor}]}
            onPress={() => {
              setIsModal(true);
              setModalImgUrl(item.imageuri);
            }}>
            <Image
              style={[
                styles.image,
                {
                  width:
                    grid === 1
                      ? (deviceWidth / grid) * 0.5
                      : (deviceWidth / grid) * 0.57,
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
                  fontSize: grid === 1 ? 17 : grid === 2 ? 13 : 11.5,
                },
              ]}>
              {item.date}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={photoListData.current}
        initialNumToRender={15}
        renderItem={data => Images(data)}
        keyExtractor={item => item.date}
      />
      <PhotoModal isModal={isModal} modalImgUrl={modalImgUrl} />
    </>
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
    width: '100%',
    height: '100%',
  },
  imageSection: {
    marginTop: '22%',
    marginLeft: '14%',
    width: '72%',
    height: '55%',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    margin: 5,
  },
  textBackground: {
    height: '17%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#333',
    fontWeight: '700',
  },
});
