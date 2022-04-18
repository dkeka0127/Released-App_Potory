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
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Icon
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Page
import CustomHeader from '../../../components/header/CustomHeader';

// Image
const backgroundImg = '../../../assets/images/background/photoModify_bg.png';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.SafeAreaView}>
          <CustomHeader
            headerTitle="Add"
            goBackArrow={true}
            navigation={navigation}
          />
          <ImageBackground
            source={require(backgroundImg)}
            style={styles.imageBackground}>
            <View style={styles.imageContainer}>
              {/********************** Image **********************/}
              <TouchableOpacity
                style={styles.imageContent}
                onPress={() => {
                  moveToGallery();
                  // moveToCamera();
                }}>
                <Image
                  source={require('../../../assets/images/user/image2.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              {/*********************** Date ***********************/}
              <TouchableOpacity
                style={styles.dateContaier}
                onPress={() => {
                  setDatePickerOpen(true);
                }}>
                <Text style={styles.dateText}>{userDate}</Text>
                <MaterialIcons name="pencil-outline" size={20} color="#111" />
              </TouchableOpacity>
              {datePickerOpen ? (
                <DatePicker
                  modal
                  mode="date"
                  open={datePickerOpen}
                  date={date}
                  onConfirm={date => {
                    setDatePickerOpen(false);
                    setDate(date);
                    setUserDate(
                      // date.toLocaleDateString()
                      String(date.toISOString())
                        .slice(0, 10)
                        .replace(/-/gi, '.'),
                    );
                  }}
                  onCancel={() => {
                    setDatePickerOpen(false);
                  }}
                />
              ) : null}
            </View>

            {/************************* Text *************************/}
            <View style={styles.editTextCon}>
              <TextInput
                value={input}
                multiline={true}
                editable={true}
                maxLength={300}
                style={styles.textContent}
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

            {/********************** Edit Image **********************/}
            <View style={styles.textEditCon}>
              <TouchableOpacity
                hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                onPress={() => {
                  console.log('save .. !!!');
                }}>
                <MaterialIcons
                  // keyboard up ? button unShow : button show
                  name={isKeyboardVisible ? '' : 'check'}
                  size={27}
                  color="#111"
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AddPhotoScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  SafeAreaView: {
    flex: 1,
    marginBottom: ifIphoneX(-40, -10),
  },
  imageBackground: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContent: {
    width: '70%',
    height: '67%',
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  dateContaier: {
    width: '40%',
    height: 30,
    marginLeft: '60%',
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dateText: {
    fontSize: 16,
    fontStyle: 'italic',
    paddingRight: 8,
  },
  editTextCon: {
    height: '30%',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  textContent: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.7,
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  textEditCon: {
    width: '100%',
    marginTop: 10,
    paddingRight: 25,
    alignItems: 'flex-end',
  },
});
