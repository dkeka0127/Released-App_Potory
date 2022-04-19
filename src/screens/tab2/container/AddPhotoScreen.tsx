import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Page
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// Image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

function AddPhotoScreen() {
  const navigation = useNavigation();
  const [userDate, setUserDate] = useState('2020.03.03');
  const [date, setDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
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

  console.log('=======response========', response);

  // Keyboard Visible Check
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
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
              <CustomDateHeader />

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

                {/* <View style={styles.textEditCon}>
                  <TouchableOpacity
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={() => {}}>
                    <MaterialIcons
                      // keyboard up ? button unShow : button show
                      name={isKeyboardVisible ? 'check' : ''}
                      size={27}
                      color="#111"
                    />
                  </TouchableOpacity>
                </View> */}
              </View>

              {/*================ bottom btn ================*/}
              {isKeyboardVisible ? (
                <></>
              ) : (
                <>
                  <View style={area.bottomSection} />
                  <CustomFooterButton navigation={undefined} />
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
    flex: 1.2,
  },
});
