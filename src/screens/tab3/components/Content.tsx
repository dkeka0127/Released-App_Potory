import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Image
const profile = '../../../assets/images/icons/userProfile.png';
const bubble = require('../../../assets/images/icons/bubble.png');
const scale0 = require('../../../assets/images/icons/scale_0.png');
const scale1 = require('../../../assets/images/icons/scale_1.png');
const scale2 = require('../../../assets/images/icons/scale_2.png');
const scale3 = require('../../../assets/images/icons/scale_3.png');
const scale4 = require('../../../assets/images/icons/scale_4.png');
const potory_green = require('../../../assets/images/potory/potory_blue.png');
const potory_orange = require('../../../assets/images/potory/potory_blue.png');
const potory_blue = require('../../../assets/images/potory/potory_blue.png');
const potory_purple = require('../../../assets/images/potory/potory_blue.png');
const potory_pink = require('../../../assets/images/potory/potory_blue.png');

// Variable
const point = 150;
const name = '리리';
const userLevel = '소꿉친구';
const photoNum = 32;
const userName = '포토리 유저';

const percent = 37;
const percentage = Math.round((percent / 100) * 95) + '%';
const PercentageString = String(percentage);

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Content() {
  const [response, setResponse] = useState<any>(null); // 사진 uri

  // 프로필 사진 설정
  const moveToGallery = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
  };

  const InfoBox = ({title, value}) => {
    return (
      <View style={styles.infoBaxContainer}>
        <View style={styles.infoBoxContent}>
          <View style={styles.infoBoxImg}>
            <MaterialIcons name="pencil-outline" size={28} color="#666" />
          </View>

          <View>
            <Text style={styles.infoBoxTitle}>{title}</Text>
            <Text style={styles.infoBoxText}>{value}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/*============================== Nav ==============================*/}
      <View style={styles.nav}>
        {/*---------- profile Img ----------*/}
        <TouchableOpacity
          onPress={moveToGallery}
          style={styles.userImgContainer}>
          <Image source={require(profile)} style={styles.userImg} />
        </TouchableOpacity>

        {/*----------- user Name -----------*/}
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>{userName}</Text>

          <TouchableOpacity hitSlop={styles.hitslop}>
            <MaterialIcons name="pencil-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/*----------- info box -----------*/}
        <View style={styles.infoBox}>
          <InfoBox title="Level" value={2} />
          <View style={styles.centerLine} />
          <InfoBox title="Photos" value={20} />
        </View>
      </View>

      {/*============================ Content ============================*/}
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          {/*----------- text -----------*/}
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>
              레벨업까지 {'\n'}
              <Text style={styles.designText}>2장</Text> 남았어요 !
            </Text>
            <Text style={styles.subText}>포토리가 {userName} 응원해 💛</Text>
          </View>

          {/*----------- rating -----------*/}
          <View style={scale.container}>
            <View style={scale.bubbleContainer}>
              <View style={scale.bubbleContent}>
                <ImageBackground
                  resizeMode="contain"
                  source={bubble}
                  style={scale.bubbleImg}>
                  <Image source={potory_green} style={scale.potoryImg} />
                </ImageBackground>
              </View>
            </View>

            <View style={scale.barContainer}>
              <View style={scale.barContent} />
            </View>

            <View style={scale.scaleContainer}>
              <Image source={scale0} style={scale.scaleImg} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Content;

const borderRadius = 60;
const navFlex = 4;
const contentFlex = 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hitslop: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },

  // ---------------- nav ----------------
  nav: {
    flex: navFlex,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f7f0e8',
    backgroundColor: '#efe8e1',
  },
  userImgContainer: {
    borderWidth: 4, // 프로필 사진 외부 선 두께
    borderColor: '#fff',
    borderRadius: borderRadius + 10,
    backgroundColor: '#fff',
    // 그림자
    elevation: 4,
    shadowRadius: 7,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(96, 83, 68)',
    shadowOffset: {height: 0, width: 0},
  },
  userImg: {
    width: 105,
    height: 105,
    resizeMode: 'cover',
    borderRadius: borderRadius,
    opacity: 0.4,
  },
  userNameContainer: {
    width: '100%',
    height: 50,
    marginTop: 7, // 유저네임 marginTop
    marginBottom: 12, // 유저네임 marginBottom
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  userNameText: {
    fontSize: 21,
    paddingLeft: 17,
    paddingRight: 7,
  },
  infoBox: {
    width: '80%',
    height: 70,
    marginBottom: 45, // nav marginBottom
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    // 그림자
    elevation: 4,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(145, 129, 113)',
    shadowOffset: {height: 0, width: 0},
  },
  infoBaxContainer: {
    width: '50%',
    height: '100%',
  },
  infoBoxContent: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoBoxImg: {
    width: 65,
    height: '100%',
    paddingLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoBoxText: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 0,
    color: '#7A6D5B',
  },
  centerLine: {
    width: 1,
    height: '60%',
    backgroundColor: '#e0d5c9',
  },

  // ---------------- content ----------------
  content: {
    flex: contentFlex,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 37,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  designText: {
    color: '#7A6D5B',
  },
  subText: {
    fontSize: 14,
    paddingTop: 12,
    fontWeight: '300',
    letterSpacing: -0.64,
  },
});

const bubbleSize = 80;
const barMargin = 30;
const addMargin = 10;

const scale = StyleSheet.create({
  container: {
    flex: 1,
  },

  bubbleContainer: {
    flex: 2,
    // marginLeft: 65, // margin
    marginLeft: barMargin + addMargin,
    marginRight: barMargin,
  },
  bubbleContent: {
    flex: 1,
    width: PercentageString, // bubble percentage
    paddingBottom: 18,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: bubbleSize / 2,
  },
  bubbleImg: {
    width: bubbleSize,
    height: bubbleSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  potoryImg: {
    width: '60%',
    height: '60%',
    marginBottom: '10%',
    resizeMode: 'contain',
  },

  barContainer: {
    flex: 1,
    height: 50,
    marginLeft: barMargin,
    marginRight: barMargin,
    borderRadius: 30,
    // backgroundColor: '#7A6D5B',
    backgroundColor: '#f2ece6',
    // 그림자
    elevation: 4,
    shadowRadius: 0.5,
    shadowOpacity: 0.3,
    shadowColor: 'rgb(76, 69, 63)',
    shadowOffset: {height: 0, width: 0},
  },
  barContent: {
    flex: 1,
    width: PercentageString, // bar percentage
    margin: '2.3%',
    borderRadius: 30,
    // backgroundColor: '#f7f0e8',
    backgroundColor: '#aa9c8d',
  },

  scaleContainer: {
    flex: 1.5,
    marginLeft: barMargin + 10,
    marginRight: barMargin + 10,
  },
  scaleImg: {
    width: '100%',
    resizeMode: 'contain',
  },
});
