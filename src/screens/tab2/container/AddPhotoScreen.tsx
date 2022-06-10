/* React & Package */
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
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';

/* AdMob */
import mobileAds, {
  MaxAdContentRating,
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

/* custom components */
import Loading from '../../../components/Loading';
import QRCodeScanner from './QRCodeScreen';
import Toast from '../../../components/Toast/Toast';
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

//api
import {getAsyncStorage_userIdx} from '../../../core/UserInfo';
import {api_registPhoto, api_registPhotoByQR} from '../../../core/api/Module';

// image & icons
import Ionicons from 'react-native-vector-icons/Ionicons';
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

// variable
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const galleryOption = {
  title: 'Select Image',
  type: 'library',
  options: {
    mediaType: 'photo',
    selectionLimit: 1,
  },
  quality: 1,
  selectionLimit: 1,
};

// 광고 단위 ID
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-7203856140151966/4393353573';

const AdMob_interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

//
//
//

function AddPhotoScreen() {
  const navigation = useNavigation();
  const [userIdx, setUseIdx] = useState<any>();
  getAsyncStorage_userIdx().then(res => setUseIdx(res));

  const [loading, setLoading] = useState(false);
  const [photoOrQR, setPhotoOrQr] = useState('');
  const [touchable, setTouchable] = useState(false);
  const [qrScreenIsOpen, setQRScreenIsOpen] = useState(false);

  const [memo, setMemo] = useState('');
  const [date, setDate] = useState(
    String(new Date().toISOString()).slice(0, 10).replace(/-/gi, '.'),
  );
  const [imageUri, setImageUri] = useState(null);
  const [shownModal, setShownModal] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // useEffect (* admob & keyboard)

  useEffect(() => {
    AdMob_interstitial.load();

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

  // function

  const receiveAsyncDateFromHeader = (value: string) => setDate(value);

  const openGallery = async () => {
    setPhotoOrQr('photo');
    launchImageLibrary(galleryOption, response => {
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
    setPhotoOrQr('qr');
    setShownModal(false);
    setQRScreenIsOpen(true);
  };

  const getQRLink = (value: string) => {
    setQRScreenIsOpen(false);
    setLoading(true);

    api_registPhotoByQR(userIdx, value)
      .then(res => {
        setLoading(false);
        setImageUri(res.data.data.image);
        console.log('api_registPhotoByQR Success == ', res.data.data);
      })
      .catch(err => {
        setLoading(false);

        if (err.message.slice(-3) === 500) {
          Toast.show('지원 예정인 지점 / 브랜드입니다.');
        } else if (err.message.slice(-3) === 404) {
          Toast.show('사진의 유효기간이 만료되었습니다.');
        } else {
          Toast.show('사진의 유효기간이 만료되었거나\n지원 예정인 지점입니다.');
        }
        console.log('api_registPhotoByQR Err == ', err);
      });
  };

  // api

  const sendDataToAPI = async () => {
    // 사진 미등록
    if (imageUri === null) Toast.show('사진을 선택해주세요.');
    // 사진 등록
    else {
      AdMob_interstitial.show();

      AdMob_interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        callRegistPhotoAPI();
      });
    }
  };

  const callRegistPhotoAPI = () => {
    const formdata = new FormData();

    formdata.append('user_idx', userIdx);
    formdata.append('date', date);
    formdata.append('memo', memo);
    formdata.append('type', 'file');
    if (photoOrQR === 'photo') {
      formdata.append('image', {
        uri: imageUri.uri,
        type: imageUri.type,
        name: imageUri.fileName,
      });
    } else if (photoOrQR === 'qr') {
      formdata.append('image', {
        uri: imageUri,
        type: 'image/png',
        name: 'photo.jpg',
      });
    }

    connectAPI_regist(formdata);
  };

  const connectAPI_regist = async (formdata: FormData) => {
    setLoading(true);
    setTouchable(true);
    AdMob_interstitial.removeAllListeners();

    api_registPhoto(formdata)
      .then(res => {
        setLoading(false);
        setTouchable(false);
        Toast.show('저장이 완료되었습니다.');
        navigation.navigate('Tab2');
        console.log('regist photo Success == ');
      })
      .catch(err => {
        setLoading(false);
        setTouchable(false);
        Toast.show(
          '사진 저장 중 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.',
        );
        console.log('regist photo Err == ', err);
      });
    // navigate로 페이지 이동 후에 실행되기 때문에 메모리 누수 일어나는 warning 나옴
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  //
  //
  //

  return qrScreenIsOpen ? (
    <QRCodeScanner QRLink={getQRLink} />
  ) : (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <FastImage source={require(bgImg)} style={styles.bgImg}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.SafeAreaView}>
              {/*========================= header =========================*/}

              <CustomDateHeader
                date={''}
                getChangedDate={receiveAsyncDateFromHeader}
              />

              {/*====================== select modal ======================*/}

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
                    <Text style={styles.modalText}>갤러리</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalTextCon}
                    onPress={openQRScreen}>
                    <Text style={styles.modalText}>QR</Text>
                    <Text style={styles.modalSubText}>
                      초점을 맞춘 후 3초간 기다려주세요 :)
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              {/*========================== photo ==========================*/}

              <View
                style={[area.container, {flex: isKeyboardVisible ? 1.5 : 6}]}>
                <Text style={area.title}>Photo</Text>
                {!isKeyboardVisible && (
                  <TouchableOpacity
                    disabled={touchable}
                    style={area.photoSection}
                    onPress={() => setShownModal(true)}>
                    {imageUri === null ? (
                      <Ionicons
                        name="camera-outline"
                        size={42}
                        color="#3a2e23"
                      />
                    ) : photoOrQR === 'photo' ? (
                      <Image source={{uri: imageUri.uri}} style={area.image} />
                    ) : (
                      <Image source={{uri: imageUri}} style={area.image} />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              {/*========================== memo ==========================*/}

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
                    editable={!touchable}
                    maxLength={500}
                    style={area.memoText}
                    onChangeText={text => setMemo(text)}
                  />
                </View>
              </View>

              {/*======================= bottom btn =======================*/}

              {isKeyboardVisible === false && (
                <>
                  <View style={area.bottomSection} />
                  <CustomFooterButton
                    title="작성 완료"
                    action={sendDataToAPI}
                  />
                </>
              )}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </FastImage>
      </KeyboardAvoidingView>

      {/*======================= loading =======================*/}

      {loading && <Loading />}
    </>
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
    height: 170,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
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
  modalText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalSubText: {
    marginTop: 7,
    color: '#555',
    fontSize: 13,
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
    lineHeight: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 10,
    borderRadius: 10,
    // letterSpacing: -0.7,
  },
  bottomSection: {
    flex: 1.8,
  },
});
