import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

const grid = 2;
const date = '2022.02.14';
const image1 = '../../../assets/images/image1.png';
const image2 = '../../../assets/images/image2.png';
const image3 = '../../../assets/images/image3.png';

const deviceWidth = Dimensions.get('window').width;

function Content() {
  const Images = image => {
    return (
      <View style={styles.imageContent}>
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.imageBackground}>
            <Image style={styles.image} source={require(image3)} />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              height: '23%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: grid === 1 ? 16 : grid === 2 ? 13 : 11.5,
                color: '#333',
              }}>
              {date}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {grid === 1 ? (
          <Images image={image1} />
        ) : grid === 2 ? (
          <>
            <Images image={image1} />
            <Images image={image1} />
          </>
        ) : (
          <>
            <Images image={image1} />
            <Images image={image2} />
            <Images image={image3} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageContent: {
    width: deviceWidth / grid,
    height: (deviceWidth / grid) * 1.15,
    padding:
      grid === 1 ? '14%' : grid === 2 ? '6.5%' : grid === 3 ? '3.5%' : '2%',
  },
  imageSection: {
    width: '100%',
    height: '100%',
    padding: grid === 1 ? 12 : grid === 2 ? 8 : 5,
    paddingBottom: 0,
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  imageBackground: {
    width: '100%',
    height: '77%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  image: {
    backgroundColor: '#fff',
    width: '100%',
    height: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: (deviceWidth / grid) * 0.6,
    height: (deviceWidth / grid) * 0.65,
  },
});
