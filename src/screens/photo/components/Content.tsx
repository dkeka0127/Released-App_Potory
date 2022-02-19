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
} from 'react-native';

const margin = 7; // 전체 Container의 양 옆 여백 값

const deviceWidth = Dimensions.get('window').width;

interface Props {
  photoList: any;
  grid?: number;
  sequence?: string;
}

function Content({grid, photoList, sequence}: Props) {
  const gridNum = grid;
  const photoListData = useRef(photoList);
  // sequence
  useEffect(() => {
    photoListData.current = photoList.reverse();
  }, [sequence]);

  console.log('grid ========== ', grid);
  console.log('sequence ========== ', sequence);

  const Images = ({item}) => {
    return (
      <View
        style={{
          width: (deviceWidth - margin * 2) / gridNum,
          height: ((deviceWidth - margin * 2) / gridNum) * 1.15,
          padding: gridNum === 1 ? '13%' : gridNum === 2 ? '8%' : '7%', // 폴라로이드 크기를 조절하는 상위 padding
        }}>
        <View
          style={[
            styles.imageSection,
            {
              padding: gridNum === 1 ? 12 : gridNum === 2 ? 8 : 6, // 폴라로이드 padding
            },
          ]}>
          <TouchableOpacity style={styles.imageBackground}>
            <Image
              style={[
                styles.image,
                {
                  width: (deviceWidth / gridNum) * 0.7,
                  height:
                    grid === 1
                      ? (deviceWidth / gridNum) * 0.63
                      : (deviceWidth / gridNum) * 0.7,
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
                  fontSize: gridNum === 1 ? 16 : gridNum === 2 ? 13 : 11.5,
                },
              ]}>
              {item.date}
            </Text>
          </View>
        </View>
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
    width: '100%',
    height: '23%', // image 높이를 제외한 퍼센트
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    // fontSize: grid === 1 ? 16 : grid === 2 ? 13 : 11.5,
    color: '#333',
    fontWeight: '600',
  },
});
