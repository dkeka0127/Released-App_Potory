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
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CameraScreen} from 'react-native-camera-kit';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// custom components
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from './QRCodeScreen';

// image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

function AddPhotoScreen() {
  const navigation = useNavigation();

  const [input, setInput] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [date, setDate] = useState(
    String(new Date().toISOString()).slice(0, 10).replace(/-/gi, '.'),
  );

  // gallery
  const [imageUri, setImageUri] = useState(null);
  const [response, setResponse] = useState<any>(null); // 갤러리에서 가져온 사진 response

  const getDate = value => {
    setDate(value); // 변경된 날짜 받아옴
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

  // 작성 완료 Btn
  const confirm = () => {
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
  console.log('Memo ~~~~~~~~~~~', input);
  console.log('Photo URI ========', imageUri);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <FastImage source={require(bgImg)} style={styles.bgImg}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.SafeAreaView}>
              {/*================== header ==================*/}
              <CustomDateHeader date={''} getDate={getDate} />

              {/*================== photo ==================*/}
              <View style={[area.container, {flex: isKeyboardVisible ? 1 : 6}]}>
                <Text style={area.title}>Photo</Text>
                <TouchableOpacity
                  style={area.photoSection}
                  // onPress={() => {
                  //   navigation.navigate('QRCodeScreen');
                  // }}
                  onPress={openGallery}>
                  {imageUri === null && (
                    <Ionicons name="camera-outline" size={42} color="#3a2e23" />
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
                  {/* <CameraScreen
                    showFrame={true}
                    scanBarcode={false}
                    laserColor={'#FF3D00'}
                    frameColor={'#00C853'}
                    colorForScannerFrame={'black'}
                    onReadCode={event =>
                      event.onQR_Code_Scan_Done(
                        console.log('event', event.nativeEvent.codeStringValue),
                      )
                    }
                    // Barcode props
                    // scanBarcode={true}
                    // onReadCode={event => console.log('QR code found')} // optional
                    // showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
                    // laserColor="red" // (default red) optional, color of laser in scanner frame
                    // frameColor="white" // (default white) optional, color of border of scanner frame
                    // cameraRatioOverlay={undefined}
                    // captureButtonImage={undefined}
                    // captureButtonImageStyle={undefined}
                    // cameraFlipImage={undefined}
                    // cameraFlipImageStyle={undefined}
                    // hideControls={undefined}
                    // torchOnImage={undefined}
                    // torchOffImage={undefined}
                    // torchImageStyle={undefined}
                    // onBottomButtonPressed={function (event: any): void {
                    //   throw new Error('Function not implemented.');
                    // }}
                  /> */}
                </TouchableOpacity>
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
                    value={input}
                    multiline={true}
                    editable={true}
                    maxLength={300}
                    style={area.memoText}
                    onChangeText={text => {
                      console.log('hihi'); // fix
                      setInput(text);
                    }}
                    onEndEditing={() => {
                      console.log('input is Done ~~~~~');
                    }}
                    onSubmitEditing={() => {
                      console.log('input is ');
                    }}
                  />
                </View>
              </View>
              {/*================ bottom btn ================*/}
              {isKeyboardVisible === false && (
                <>
                  <View style={area.bottomSection} />
                  <CustomFooterButton title="작성 완료" action={confirm} />
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

// const SectionBGColor = '#eaeaea';
const SectionBGColor = '#f7f2ed';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  bgImg: {
    flex: 1,
    // marginBottom: ifIphoneX(-40, -10),
  },
  SafeAreaView: {
    flex: 1,
  },
});

const area = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    paddingTop: 15,
    paddingLeft: 17,
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
  },
  memoSection: {
    flex: 1,
    marginTop: 15,
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 25,
    borderRadius: 13,
    backgroundColor: SectionBGColor,
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
