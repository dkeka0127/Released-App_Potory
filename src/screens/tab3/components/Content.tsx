import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Image
const profile = '../../../assets/images/icons/userProfile.png';
// Variable
const point = 150;
const name = '리리';
const userLevel = '소꿉친구';
const photoNum = 32;
const userName = '포토리 유저';

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
            <MaterialIcons name="pencil-outline" size={32} color="#666" />
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
            <MaterialIcons name="pencil-outline" size={24} color="#666" />
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
        {/* <ScrollView style={styles.scrollView}> */}
        {/*----------- text -----------*/}
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            레벨업까지 {'\n'}
            <Text style={styles.designText}>2장</Text> 남았어요 !
          </Text>
          <Text style={styles.subText}>포토리가 {userName} 응원해 💛</Text>
        </View>

        {/*----------- rating -----------*/}
        <View
          style={{
            flex: 1,
            backgroundColor: 'pink',
          }}></View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
}

export default Content;

const borderRadius = 60;
const navFlex = 4;
const contentFlex = 5;

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
    backgroundColor: '#f7f0e8',
    // backgroundColor: '#fff',
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
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: borderRadius,
    opacity: 0.4,
  },
  userNameContainer: {
    width: '100%',
    height: 50,
    marginTop: 15, // 유저네임 marginTop
    marginBottom: 22, // 유저네임 marginBottom
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  userNameText: {
    fontSize: 24,
    paddingLeft: 17,
    paddingRight: 7,
  },
  infoBox: {
    width: '80%',
    height: 84,
    marginBottom: 40, // nav marginBottom
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
    fontSize: 16,
  },
  infoBoxText: {
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 2,
    color: '#7A6D5B',
  },
  centerLine: {
    width: 1,
    height: '70%',
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
    height: 170,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 29,
    fontWeight: '500',
    lineHeight: 40,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  designText: {
    color: '#7A6D5B',
  },
  subText: {
    fontSize: 15,
    paddingTop: 12,
    // fontWeight: '500',
    letterSpacing: -0.24,
  },
});
