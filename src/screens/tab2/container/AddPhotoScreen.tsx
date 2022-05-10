// React & packages
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CameraScreen} from 'react-native-camera-kit';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// custom components
import Toast from '../../../components/Toast/Toast';
import QRCodeScanner from './QRCodeScreen';
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import {api_registPhoto} from 'core/api/Module';
import Loading from 'components/Loading';
import axios from 'axios';

// image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

function AddPhotoScreen() {
  const navigation = useNavigation();

  const [memo, setMemo] = useState('');
  const [date, setDate] = useState(
    String(new Date().toISOString()).slice(0, 10).replace(/-/gi, '.'),
  );
  const [imageUri, setImageUri] = useState(null);
  const [shownModal, setShownModal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // function
  const receiveDateFromHeader = (value: string) => setDate(value);

  const openGallery = () => {
    const option = {
      // quality: 1,
      // noData: true,
      mediaType: 'photo' as const,
    };

    launchImageLibrary(option, response => {
      setShownModal(false);

      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.errorCode) {
        console.log('image picker error', response.errorMessage);
      } else {
        setImageUri(response.assets[0]);
      }
    });
  };

  const openQRScreen = () => {
    setShownModal(false);
    navigation.navigate('QRCodeScreen');
  };

  const axiosConfig = {
    baseURL: '',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
      // memberIdx: 0,
      // deviceId: '',
    },
    // timeout: 30000,
  };

  const saveTheData = () => {
    if (imageUri === null) {
      Toast.show('사진을 선택해주세요.');
    } else {
      api_registPhoto(8, date, memo, imageUri.uri)
        .then(response => {
          console.log('response == ', response);
        })
        .catch(err => {
          console.log('err == ', err);
        });
      // registPhoto();
      console.log('사진 저장');

      // console.log('Date ---- ', date);
      // console.log('Memo ----', memo);
      // console.log('Img URI ----', imageUri.uri);
    }
  };

  const registPhoto = () => {
    console.log('Date ---- ', date);
    console.log('Memo ----', memo);
    console.log('Img URI ----', imageUri.uri);

    api_registPhoto(8, '2022-04-06', 'memo', '/Users/sol/Desktop/codepush.png')
      .then(res => {
        navigation.navigate('Tab2');
        console.log('regist photo Success !', res);
      })
      .catch(err => {
        Toast.show(
          '사진 저장 중 오류가 발생하였습니다.\n다시 시도해 주시기 바랍니다.',
        );
        console.log('oh no ......', err);
      });
  };

  // useEffect (* keyboard)
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //
  //
  //

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <FastImage source={require(bgImg)} style={styles.bgImg}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.SafeAreaView}>
            {/*================== header ==================*/}
            <CustomDateHeader
              date={''}
              getChangedDate={receiveDateFromHeader}
            />

            {/*================ select modal ================*/}
            <Modal
              style={styles.modalContainer}
              isVisible={shownModal}
              hasBackdrop={true}
              backdropColor="black"
              backdropOpacity={0.8}
              onBackdropPress={() => setShownModal(false)}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={[styles.modalTextCon, styles.modalDivideLine]}
                  onPress={openGallery}>
                  <Text>갤러리에서 사진 선택</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalTextCon}
                  onPress={openQRScreen}>
                  <Text>QR 코드로 사진 저장</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            {/*==================== photo ====================*/}
            <View style={[area.container, {flex: isKeyboardVisible ? 1.5 : 6}]}>
              <Text style={area.title}>Photo</Text>
              {!isKeyboardVisible && (
                <TouchableOpacity
                  style={area.photoSection}
                  onPress={() => setShownModal(true)}>
                  {imageUri === null ? (
                    <Ionicons name="camera-outline" size={42} color="#3a2e23" />
                  ) : (
                    <Image source={{uri: imageUri.uri}} style={area.image} />
                  )}
                </TouchableOpacity>
              )}
            </View>

            {/*===================== memo =====================*/}
            <View
              style={[
                area.container,
                {
                  flex: isKeyboardVisible ? 7 : 3.2,
                },
              ]}>
              <Text style={area.title}>Memo</Text>
              <View style={area.memoSection}>
                <TextInput
                  value={memo}
                  multiline={true}
                  editable={true}
                  maxLength={500}
                  style={area.memoText}
                  onChangeText={text => setMemo(text)}
                />
              </View>
            </View>

            {/*================= bottom btn =================*/}
            {isKeyboardVisible === false && (
              <>
                <View style={area.bottomSection} />
                <CustomFooterButton title="작성 완료" action={saveTheData} />
              </>
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </FastImage>
    </KeyboardAvoidingView>
  );
}

export default AddPhotoScreen;

const SectionBGColor = '#fff';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
  },
  SafeAreaView: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: 250,
    height: 150,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextCon: {
    width: '80%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDivideLine: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
});

const area = StyleSheet.create({
  container: {
    flex: 6,
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#fff',

    // 그림자
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  // headerTitleCon: {
  //   paddingTop: 13,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // headerCircleShape: {
  //   width: 31,
  //   height: 25,
  //   marginLeft: 17,
  //   marginRight: -17,
  //   backgroundColor: '#d7ceed',
  //   borderRadius: 30,
  // },
  title: {
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 13,
    marginLeft: 17,
    alignItems: 'center',
  },
  photoSection: {
    flex: 1,
    padding: 20,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SectionBGColor,

    // 그림자
    elevation: 2,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  memoSection: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    borderRadius: 13,
    backgroundColor: SectionBGColor,

    // 그림자
    elevation: 2,
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  memoText: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    // fontWeight: '600',
    lineHeight: 20,
    // letterSpacing: -0.7,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 10,
    borderRadius: 10,
  },
  bottomSection: {
    flex: 1.8,
  },
});
