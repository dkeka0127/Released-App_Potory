// React & packages
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// custom components
import Toast from 'components/Toast/Toast';
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// api
import {api_editPhoto} from 'core/api/Module';

// variable
import {userNum} from '../../../core/UserInfo';

// image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

function EditPhotoScreen({route}: any) {
  const navigation = useNavigation();
  const ImgURL = route.params.modalImageInfo?.photo_url;
  const photoNum = route.params.modalImageInfo?.photo_idx;
  const [memo, setMemo] = useState(route.params.modalImageInfo?.memo);
  const [date, setDate] = useState(route.params.modalImageInfo?.date);
  const preDate = route.params.modalImageInfo?.date;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // useEffect (* keyboard)
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

  // function
  const sendDataToAPI = () => {
    connectAPI_edit();
  };

  const connectAPI_edit = () => {
    api_editPhoto(photoNum, date, memo, userNum)
      .then(res => {
        Toast.show('편집이 완료되었습니다.');
        navigation.navigate('Tab2');
        console.log('edit photo Success == ');
      })
      .catch(err => {
        Toast.show(
          '사진 편집 중 오류가 발생하였습니다.\n다시 시도해 주시기 바랍니다.',
        );
        console.log('edit photo Err == ', err);
      });
  };

  const getChangedDate = (value: string) => {
    setDate(value);
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <FastImage source={require(bgImg)} style={styles.bgImg}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.SafeAreaView}>
              {/*================== header ==================*/}
              <CustomDateHeader
                date={preDate}
                getChangedDate={getChangedDate}
              />

              {/*================== photo ==================*/}
              <View
                style={[area.container, {flex: isKeyboardVisible ? 1.5 : 6}]}>
                <Text style={area.title}>Photo</Text>
                <View style={area.photoSection}>
                  <Image source={{uri: ImgURL}} style={area.photoStyle} />
                </View>
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
                    onChangeText={text => setMemo(text)}
                    // onEndEditing={() => console.log('memo is Done ~~~~~')}
                    // onSubmitEditing={() => console.log('memo is ')}
                  />
                </View>
              </View>

              {/*================ bottom btn ================*/}
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
    </>
  );
}

export default EditPhotoScreen;

const SectionBGColor = '#fff';

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
    alignItems: 'center',
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
  },
  photoStyle: {
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
