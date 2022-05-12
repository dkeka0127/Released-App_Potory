// React & packages
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

// custom components
import Loading from 'components/Loading';

// api
import {api_checkDeviceExist, api_editDevice} from 'core/api/Module';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// images
const baseProfile = '../../../assets/images/potory/profile_potory.png';
const scale0 = require('../../../assets/images/icons/scale_0.png');
const scale1 = require('../../../assets/images/icons/scale_1.png');
const scale2 = require('../../../assets/images/icons/scale_2.png');
const scale3 = require('../../../assets/images/icons/scale_3.png');
const scale4 = require('../../../assets/images/icons/scale_4.png');
const potory_pink = require('../../../assets/images/potory/slide_potory_pink.png');
const potory_blue = require('../../../assets/images/potory/slide_potory_blue.png');
const potory_green = require('../../../assets/images/potory/slide_potory_green.png');
const potory_orange = require('../../../assets/images/potory/slide_potory_orange.png');
const potory_purple = require('../../../assets/images/potory/slide_potory_purple.png');

// variable
import {userNum} from '../../../core/UserInfo';
const deviceHeight = Dimensions.get('window').height;
function Content() {
  const [newUserName, setNewUserName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [response, setResponse] = useState<any>(null); // 사진 uri

  // user info
  const [userInfoData, setUserInfoData] = useState(null);
  const [photoNum, setPhotoNum] = useState(0);
  const [userName, setUserName] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const [profileImg, setProfileImg] = useState();

  const [userLevel, setUserLevel] = useState('동네친구');
  const [setScale, setScaleImg] = useState(scale0);
  const [setPotory, setPotoryImg] = useState(potory_purple);

  // set percentage
  const quotient = parseInt(photoNum / 50); // photoNum의 몫
  const reminder = photoNum % 50; // photoNum의 나머지
  const percent = reminder === 0 && quotient !== 0 ? 100 : reminder * 2; // photoNum 퍼센트 변환
  const percentage = Math.round((percent / 100) * 95) + '%';
  const PercentageString = String(percentage);

  let leftPhotoForNextLevel =
    reminder === 0 && quotient === 0
      ? 51
      : reminder === 0 && quotient !== 0
      ? 1
      : 50 - reminder + 1;

  // useEffect
  useFocusEffect(
    React.useCallback(() => {
      connectAPI_getUserInfo();
      console.log('********* UserInfo API will be ReLoading *********');
    }, []),
  );

  useEffect(() => {
    if (userInfoData) initUserInfo();
  }, [userInfoData]);

  // api
  const connectAPI_getUserInfo = () => {
    api_checkDeviceExist(userNum)
      .then(res => {
        setUserInfoData(res.data.data);
        console.log('connectAPI_getUserInfo Success == ');
      })
      .catch(err => {
        console.log('connectAPI_getUserInfo Err == ', err);
      });

    return;
  };

  const connectAPI_editUserInfo_UserName = () => {
    api_editDevice(userNum, newUserName, undefined)
      .then(res => {
        setUserInfoData(res.data.data);
        setNewUserName('');
        setModalVisible(false);
        console.log('connectAPI_editUserInfo_UserName Success == ');
      })
      .catch(err => {
        console.log('connectAPI_editUserInfo_UserName Err == ', err);
      });

    return;
  };

  const connectAPI_editUserInfo_UserImg = () => {
    api_editDevice(userNum, undefined, profileImg)
      .then(res => {
        setUserInfoData(res.data.data);
        console.log('connectAPI_editUserInfo_UserImg Success == ');
      })
      .catch(err => {
        console.log('connectAPI_editUserInfo_UserImg Err == ', err);
      });

    return;
  };

  // function
  const initUserInfo = () => {
    setUserName(userInfoData.nick_name);
    setDeviceID(userInfoData.device_id);
    setPhotoNum(userInfoData.photo_count);
    setProfileImg(userInfoData.profile_image);
    if (userInfoData.photo_count > 200) {
      setScaleImg(scale4);
      setUserLevel('깐부');
      setPotoryImg(potory_pink);
    } else if (userInfoData.photo_count > 150) {
      setScaleImg(scale3);
      setPotoryImg(potory_orange);
    } else if (userInfoData.photo_count > 100) {
      setScaleImg(scale2);
      setUserLevel('단짝친구');
      setPotoryImg(potory_green);
    } else if (userInfoData.photo_count > 50) {
      setScaleImg(scale1);
      setUserLevel('친한친구');
      setPotoryImg(potory_blue);
    } else if (userInfoData.photo_count > 15) {
      setScaleImg(scale0);
      setUserLevel('소꿉친구');
      setPotoryImg(potory_purple);
    } else {
      setScaleImg(scale0);
      setUserLevel('동네친구');
      setPotoryImg(potory_purple);
    }
  };

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

  const LevelAndPhotoComponent = ({title, value}: any) => {
    return (
      <View style={styles.infoBaxContainer}>
        <View style={styles.memuAreaContent}>
          <View style={styles.memuAreaImg}>
            {title === 'Level' ? (
              <FontAwesome5 name="route" size={25} color="#735e9b" />
            ) : (
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

  // if (userInfoData === null) return <Loading />;

  return (
    <View style={styles.container}>
      {/*======================================== Nav ========================================*/}
      <View style={styles.nav}>
        {/*---------- profile Img ----------*/}
        <TouchableOpacity
          onPress={moveToGallery}
          style={styles.userImgContainer}>
          {!profileImg ? (
            <Image source={require(baseProfile)} style={styles.userImg} />
          ) : (
            <Image source={{uri: profileImg}} style={styles.userImg} />
          )}
        </TouchableOpacity>

        {/*----------- user Name -----------*/}
        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>
            {userName === '' ? `user_410${deviceID}` : userName}
          </Text>

          <TouchableOpacity
            hitSlop={styles.hitslop}
            onPress={() => setModalVisible(true)}>
            <MaterialIcons name="pencil-outline" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/*----------- menu box -----------*/}
        <View style={styles.memuArea}>
          <LevelAndPhotoComponent title="Level" value={userLevel} />
          <View style={styles.centerLine} />
          <LevelAndPhotoComponent title="Photos" value={photoNum} />
        </View>
      </View>

      {/*====================================== Content ======================================*/}
      <View style={styles.content}>
        <ScrollView style={styles.scrollView}>
          {/*----------- text -----------*/}
          <View style={styles.textContainer}>
            {/* <Text style={styles.mainText}>
              오늘도 행복한 {'\n'}하루 보내세요 !
            </Text> */}
            <Text style={styles.mainText}>
              포토리 성장까지{'\n'}
              <Text style={styles.designText}>{leftPhotoForNextLevel}장 </Text>
              남았어요 !
            </Text>
            {/* <Text style={styles.subText}>포토리가 {userName} 응원해 💛</Text> */}
            <Text style={styles.subText}>
              {userName === '' ? `user_410${deviceID}` : userName}랑 포토리는{' '}
              {userLevel} ❤︎
            </Text>
          </View>

          {/*----------- rating -----------*/}
          <View style={scale.container}>
            <View style={scale.bubbleContainer}>
              <View style={[scale.bubbleContent, {width: PercentageString}]}>
                <Image source={setPotory} style={scale.bubbleImg} />
              </View>
            </View>

            <View style={scale.barContainer}>
              <View style={[scale.barContent, {width: PercentageString}]} />
            </View>

            <View style={scale.scaleContainer}>
              <Image source={setScale} style={scale.scaleImg} />
            </View>
          </View>
        </ScrollView>
      </View>

      {/*================================= edit userName modal =================================*/}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={modal.container}>
          <TouchableOpacity
            style={{
              zIndex: 1,
              height: 20,
              bottom: -33,
              width: modalWidth,
              paddingRight: 15,
              alignItems: 'flex-end',
            }}
            onPress={() => setModalVisible(false)}>
            <AntDesign name="close" size={22} color="white" />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={modal.modalKeyboard}>
            <View style={modal.inputContainer}>
              <TextInput
                value={newUserName}
                multiline={false}
                maxLength={10}
                style={modal.input}
                onChangeText={text => setNewUserName(text)}
              />
            </View>
            <TouchableOpacity
              style={modal.modalArrow}
              onPress={connectAPI_editUserInfo_UserName}>
              <AntDesign name="arrowright" size={20} color="#5b526d" />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}
export default React.memo(Content);

const navFlex = 3.2;
const contentFlex = 5.5;
const fontColor = '#362f44';
const barPointColor = '#fdfcff';
const barBackgroundColor = '#8273a0';
const backgroundColor = '#fdfcff';
const borderRadius = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // opacity: 0.4,
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
    fontWeight: '500',
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
    width: 60,
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
    fontSize: 17,
    fontWeight: '600',
    paddingTop: 4,
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
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 37,
    // letterSpacing: -0.74,
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
    // width: PercentageString, // bubble percentage
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
    // width: PercentageString, // bar percentage
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

const modalWidth = '80%';
const modal = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalKeyboard: {
    width: modalWidth,
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#484254',
    // borderColor: '#8273a0',
    // borderWidth: 3,
  },
  inputContainer: {
    width: '60%',
    height: 55,
    marginRight: 15,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#fbf9ff',
    borderColor: '#e8e1f7',
    borderWidth: 3,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    lineHeight: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 10,
    borderRadius: 10,
  },
  modalArrow: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f2fc',
  },
});
