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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// custom components
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

function AddPhotoScreen() {
  const navigation = useNavigation();

  const [input, setInput] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [response, setResponse] = useState<any>(null); // 갤러리에서 가져온 사진 uri

  const moveToCamera = () => {
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
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

  console.log('Memo ~~~~~~~~~~~', input);

  console.log('Photo URI ========', response);

  // 작성 완료 Btn
  const confirm = () => {};

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

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <FastImage source={require(bgImg)} style={styles.bgImg}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.SafeAreaView}>
              {/*================== header ==================*/}
              <CustomDateHeader date={''} />

              {/*================== photo ==================*/}
              <View style={[area.container, {flex: isKeyboardVisible ? 1 : 6}]}>
                <Text style={area.title}>Photo</Text>
                <TouchableOpacity
                  style={area.photoSection}
                  onPress={moveToGallery}>
                  <Ionicons name="camera-outline" size={42} />
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

const SectionBGColor = '#eaeaea';

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
    flex: 1.5,
  },
});
