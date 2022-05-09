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
import QRCodeScanner from './QRCodeScreen';
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

function AddPhotoScreen() {
  const navigation = useNavigation();
  const [memo, setMemo] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [date, setDate] = useState(
    String(new Date().toISOString()).slice(0, 10).replace(/-/gi, '.'),
  );

  const [imageUri, setImageUri] = useState(null);
  const [response, setResponse] = useState<any>(null); // photo response from gallery
  const [shownModal, setShownModal] = useState(false);

  // function

  const getChangedDate = value => {
    setDate(value);
  };

  // const moveToCamera = () => {
  //   launchCamera(
  //     {
  //       saveToPhotos: true,
  //       mediaType: 'photo',
  //       includeBase64: false,
  //     },
  //     setResponse,
  //   );
  // };

  const openGallery = () => {
    const option = {
      // noData: true,
      mediaType: 'photo' as const,
      quality: 1,
    };

    launchImageLibrary(option, response => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.errorCode) {
        console.log(response.errorMessage);
      } else {
        const data = response.assets[0];
        setImageUri(data);
        console.log('data ????????? ', data);
      }
    });
  };

  const saveTheData = () => {
    if (imageUri === null) {
      console.log('사진을 선택해주세요.');
    } else {
      console.log('사진 저장');
    }
  };

  // 키보드 이벤트
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  console.log('get Date', date);
  console.log('Memo ~~~~~~~~~~~', memo);
  console.log('Photo URI ========', imageUri);
  console.log('isKeyboardVisible========', isKeyboardVisible);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <FastImage source={require(bgImg)} style={styles.bgImg}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.SafeAreaView}>
              {/*================== header ==================*/}
              <CustomDateHeader date={''} getChangedDate={getChangedDate} />

              {/*================== modal ==================*/}
              <Modal
                style={styles.modalContainer}
                isVisible={shownModal}
                hasBackdrop={true}
                backdropColor="black"
                backdropOpacity={0.7}
                onBackdropPress={() => {
                  setShownModal(false);
                }}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={[styles.modalTextCon, styles.modalDivideLine]}
                    onPress={openGallery}>
                    <Text>갤러리에서 사진 선택</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalTextCon}
                    onPress={() => {
                      setShownModal(false);
                      navigation.navigate('QRCodeScreen');
                      // <QRCodeScanner />
                    }}>
                    <Text>QR 코드로 사진 저장</Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              {/*================== photo ==================*/}
              <View
                style={[area.container, {flex: isKeyboardVisible ? 1.5 : 6}]}>
                <Text style={area.title}>Photo</Text>

                {!isKeyboardVisible && (
                  <TouchableOpacity
                    style={area.photoSection}
                    onPress={() => {
                      setShownModal(true);
                    }}>
                    {imageUri === null && (
                      <Ionicons
                        name="camera-outline"
                        size={42}
                        color="#3a2e23"
                      />
                    )}
                    {imageUri != null && (
                      <Image
                        source={{uri: imageUri.uri}}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              {/*=================== memo ===================*/}
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
                    maxLength={300}
                    style={area.memoText}
                    onChangeText={text => {
                      console.log('hihi'); // fix
                      setMemo(text);
                    }}
                    onEndEditing={() => {
                      console.log('memo is Done ~~~~~');
                    }}
                    onSubmitEditing={() => {
                      console.log('memo is ');
                    }}
                  />
                </View>
              </View>

              {/*================ bottom btn ================*/}
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
    paddingTop: 13,
    marginLeft: 17,
    lignItems: 'center',
    fontWeight: '500',
  },
  photoSection: {
    flex: 1,
    padding: 20,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 40,
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
