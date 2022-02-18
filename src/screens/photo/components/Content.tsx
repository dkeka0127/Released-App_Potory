import React, {useEffect, useState} from 'react';
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

import {photoList} from '../../../../dummyData';

const grid = 2;
const margin = 7; // 전체 Container의 양 옆 여백 값

const deviceWidth = Dimensions.get('window').width;

// DeviceEventEmitter.addListener('gridChanged', () => {
//   console.log('hihi');
// });

const Images = ({item}) => {
  DeviceEventEmitter.addListener('gridChanged', () => {
    console.log('hihi');
  });
  return (
    <View style={styles.imageContainer}>
      <View style={styles.imageSection}>
        <TouchableOpacity style={styles.imageBackground}>
          <Image style={styles.image} source={item.imageuri} />
        </TouchableOpacity>
        <View style={styles.textBackground}>
          <Text style={styles.text}>{item.date}</Text>
        </View>
      </View>
    </View>
  );
};

function Content() {
  return (
    <FlatList
      contentContainerStyle={styles.flatListContainer}
      data={photoList}
      initialNumToRender={15}
      renderItem={data => Images(data)}
      keyExtractor={item => item.id}
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
    width: (deviceWidth - margin * 2) / grid,
    height: ((deviceWidth - margin * 2) / grid) * 1.15,
    padding: grid === 1 ? '13%' : grid === 2 ? '8%' : '7%', // 폴라로이드 크기를 조절하는 상위 padding
    // backgroundColor: '#ccc',
    // borderWidth: 1,
  },
  imageSection: {
    width: '100%',
    height: '100%',
    padding: grid === 1 ? 12 : grid === 2 ? 8 : 6, // 폴라로이드 padding
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    // 그림자
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  imageBackground: {
    width: '100%',
    height: '77%', // text 높이를 제외한 퍼센트
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  image: {
    resizeMode: 'contain',
    width: (deviceWidth / grid) * 0.7,
    height:
      grid === 1 ? (deviceWidth / grid) * 0.63 : (deviceWidth / grid) * 0.7,
  },
  textBackground: {
    width: '100%',
    height: '23%', // image 높이를 제외한 퍼센트
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: grid === 1 ? 16 : grid === 2 ? 13 : 11.5,
    color: '#333',
  },
});
