import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Image
const profile = '../../../assets/images/potory/profile_potory.png';
const bubble = require('../../../assets/images/icons/bubble.png');
const scale0 = require('../../../assets/images/icons/scale_0.png');
const scale1 = require('../../../assets/images/icons/scale_1.png');
const scale2 = require('../../../assets/images/icons/scale_2.png');
const scale3 = require('../../../assets/images/icons/scale_3.png');
const scale4 = require('../../../assets/images/icons/scale_4.png');
const potory_green = require('../../../assets/images/potory/slide_potory_blue.png');
const potory_orange = require('../../../assets/images/potory/slide_potory_blue.png');
const potory_blue = require('../../../assets/images/potory/slide_potory_blue.png');
const potory_purple = require('../../../assets/images/potory/slide_potory_blue.png');
const potory_pink = require('../../../assets/images/potory/slide_potory_blue.png');

// Variable
const point = 150;
const name = '리리';
const userLevel = '소꿉친구';
const photoNum = 32;
const userName = '포토리 유저';

const percent = 60;
const percentage = Math.round((percent / 100) * 95) + '%';
const PercentageString = String(percentage);

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const deviceHeight = Dimensions.get('window').height;

console.log(deviceHeight);

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

  const MemuArea = ({title, value}) => {
    return (
      <View style={styles.infoBaxContainer}>
        <View style={styles.memuAreaContent}>
          <View style={styles.memuAreaImg}>
            {title === 'Level' ? (
              // <MaterialIcons name="medal" size={28} color="#735e9b" />
              // <FontAwesome name="signal" size={28} color="#735e9b" />
              // <FontAwesome5 name="chart-bar" size={28} color="#735e9b" />
              <FontAwesome5 name="route" size={25} color="#735e9b" />
            ) : (
              // <MaterialIcon name="photo" size={28} color="#735e9b" />
              <Entypo name="documents" size={26} color="#735e9b" />
            )}
          </View>

          <View>
            <Text style={styles.memuAreaTitle}>{title}</Text>
            <Text style={styles.memuAreaText}>{value}</Text>
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
            <MaterialIcons name="pencil-outline" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/*----------- menu box -----------*/}
        <View style={styles.memuArea}>
          <MemuArea title="Level" value={2} />
          <View style={styles.centerLine} />
          <MemuArea title="Photos" value={20} />
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
                <Image source={potory_green} style={scale.bubbleImg} />
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
const navFlex = 3.2;
const contentFlex = 5.5;
const backgroundColor = '#fdfcff';
const barBackgroundColor = '#8273a0';
const barPointColor = '#fdfcff';
const fontColor = '#362f44';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
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
    marginTop: -5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
  },
  userImgContainer: {
    borderWidth: 4, // 프로필 사진 외부 선 두께
    borderColor: '#fff',
    borderRadius: borderRadius + 10,
    backgroundColor: '#fff',
    // 그림자
    elevation: 4,
    shadowRadius: 6,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(96, 83, 68)',
    shadowOffset: {height: 0, width: 0},
  },
  userImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: borderRadius,
    opacity: 0.4,
  },
  userNameContainer: {
    width: '100%',
    height: 50,
    marginTop: 0, // 유저네임 marginTop
    marginBottom: 10, // 유저네임 marginBottom
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  userNameText: {
    fontSize: 19,
    paddingLeft: 17,
    paddingRight: 7,
  },
  memuArea: {
    width: '80%',
    height: 68,
    marginBottom: 40, // nav marginBottom
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',

    // 그림자
    elevation: 4,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(118, 93, 160)',
    shadowOffset: {height: 0, width: 0},
  },
  infoBaxContainer: {
    width: '50%',
    height: '100%',
  },
  memuAreaContent: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  memuAreaImg: {
    width: 65,
    height: '100%',
    paddingLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memuAreaTitle: {
    fontSize: 13,
    color: '#333',
  },
  memuAreaText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 2,
    paddingBottom: 0,
    color: fontColor,
  },
  centerLine: {
    width: 1,
    height: '60%',
    backgroundColor: '#e0d5c9',
  },

  // ---------------- content ----------------
  content: {
    flex: contentFlex,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    alignContent: 'space-around',
    alignSelf: 'stretch',
    justifyContent: 'center',

    // 그림자
    elevation: 4,
    shadowRadius: 18,
    shadowOpacity: 0.35,
    shadowColor: 'rgb(162, 148, 192)',
    shadowOffset: {height: 0, width: 0},
  },
  scrollView: {
    flex: 1,
  },
  textContainer: {
    // flex: 1,
    width: '100%',
    height: 150,
    marginTop: deviceHeight > 900 ? 40 : 10,
    // marginTop: 10,
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
    color: fontColor,
    fontWeight: '500',
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
    marginTop: deviceHeight > 900 ? 30 : deviceHeight > 840 ? 25 : 0,
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
    marginLeft: bubbleSize / 2 - 10,
  },
  bubbleImg: {
    width: bubbleSize,
    height: bubbleSize,
    resizeMode: 'contain',
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
    height: 45,
    marginLeft: barMargin,
    marginRight: barMargin,
    borderRadius: 30,
    backgroundColor: barBackgroundColor,
  },
  barContent: {
    flex: 1,
    width: PercentageString, // bar percentage
    margin: '2.3%',
    borderRadius: 30,
    // backgroundColor: '#f7f0e8',
    backgroundColor: barPointColor,
  },

  scaleContainer: {
    flex: 1.5,
    marginLeft: barMargin + 10,
    marginRight: barMargin + 10,
    marginBottom: 10,
  },
  scaleImg: {
    width: '100%',
    resizeMode: 'contain',
  },
});
