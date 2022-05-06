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
import {SafeAreaView} from 'react-native-safe-area-context';

// custom components
import CustomDateHeader from '../../../components/header/CustomDateHeader';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

// image
const bgImg = '../../../assets/images/background/tab2_main_bg.jpg';

// variable
const userImg = require('../../../assets/images/user/image4.png');
const preMemo = '헤헤 hihi !!';
const preDate = '2022.04.29';

function EditPhotoScreen() {
  const [input, setInput] = useState(preMemo);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [date, setDate] = useState(
    String(new Date().toISOString()).slice(0, 10).replace(/-/gi, '.'),
  );

  console.log('Memo ~~~~~~~~~~~', input);
  console.log('date ~~~~~~~~~~~', date);

  const getChangedDate = value => {
    setDate(value);
  };

  // 작성 완료 Btn
  const confirm = () => {
    console.log('사진 저장');
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
              <View style={[area.container, {flex: isKeyboardVisible ? 1 : 6}]}>
                <Text style={area.title}>Photo</Text>
                <View style={area.photoSection}>
                  <Image source={userImg} style={area.photoStyle} />
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

export default EditPhotoScreen;

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
