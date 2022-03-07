import React, {useState} from 'react';
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
  TouchableNativeFeedbackBase,
  TouchableNativeFeedback,
  Platform,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';

// Icon
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Page
import CustomHeader from '../../common/CustomHeader';
import {ScrollView} from 'react-native-gesture-handler';

// Image
const backgroundImg = '../../../assets/images/photoModify_bg.png';

function EditPhotoScreen() {
  const navigation = useNavigation();
  const [userDate, setUserDate] = useState('2020.03.03');
  const [date, setDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [editText, setEditText] = useState(false);
  const [input, setInput] = useState(
    '오늘은 3월 3일 \n 다음주면 대통령 선거날이다. 뽀앵 배고팡 ㅇㅅㅇ \n 근데 누굴 뽑아야 할 지 모르겠는데 어떡하지 ? \n 그냥 내가 됐으면 좋곘다 ㅎㅎ \n 오늘 아침 9시에 날씨 좋다고 느끼면서 출근했는데 벌써 오후 8시다 \n 시간은 참 빨라 룰루 \n 오늘 논너가기 조은 날이라던데 .. 다들 내 몫까지 놀아주라 희희 ..',
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.SafeAreaView}>
          <CustomHeader
            headerTitle="Edit"
            goBackArrow={true}
            navigation={navigation}
          />
          <ImageBackground
            source={require(backgroundImg)}
            style={styles.container}>
            <View style={styles.imageContainer}>
              {/* Image */}
              <View style={styles.imageContent}>
                <Image
                  source={require('../../../assets/images/image2.png')}
                  style={styles.image}
                />
              </View>

              {/* Date */}
              <TouchableOpacity
                style={styles.dateContaier}
                onPress={() => {
                  setDatePickerOpen(true);
                }}>
                <Text style={styles.dateText}>{userDate}</Text>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={21}
                  color="#111"
                />
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

            <>
              {/* Edit Text & Submit Text */}
              <View style={styles.editTextCon}>
                <TextInput
                  multiline={true}
                  editable={editText}
                  // returnKeyType="next"
                  style={[{flex: 1}, styles.textContent]}
                  value={input}
                  maxLength={300}
                  onChangeText={text => {
                    console.log('hihi'); // fix
                    setInput(text);
                  }}
                  onEndEditing={() => {
                    console.log('input is Done ~~~~~`');
                  }}
                  onSubmitEditing={() => {}}
                />
              </View>

              {/* Text Edit Image */}
              {editText ? (
                <View style={styles.textEditCon}>
                  <TouchableOpacity
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={() => {
                      setEditText(false);
                    }}>
                    <Feather name="check" size={30} color="#111" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.textEditCon}>
                  <TouchableOpacity
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={() => {
                      setEditText(true);
                    }}>
                    <MaterialCommunityIcons
                      name="pencil-outline"
                      size={30}
                      color="#111"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          </ImageBackground>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default EditPhotoScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  SafeAreaView: {
    flex: 1,
    marginBottom: -40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fee',
  },
  imageContent: {
    width: '65%',
    height: '65%',
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ffe',
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
    fontSize: 15,
    fontStyle: 'italic',
    paddingRight: 8,
  },
  textContainer: {
    height: '35%',
    paddingLeft: '3%',
    paddingRight: '3%',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  editTextCon: {
    height: '35%',
    paddingLeft: '12.5%',
    paddingRight: '12.5%',
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 15,
    // backgroundColor: 'pink',
  },
  scrollStyle: {
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  textContent: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: -0.7,
    backgroundColor: 'pink',
  },
  textEditCon: {
    width: '100%',
    paddingRight: 25,
    alignItems: 'flex-end',
  },
});

// {editText ? (
//   <View style={styles.editTextCon}>
//     <TextInput
//       multiline={true}
//       editable={false}
//       // returnKeyType="next"
//       style={[{flex: 1}, styles.textContent]}
//       value={input}
//       maxLength={300}
//       onChangeText={text => {
//         console.log('hihi'); // fix
//         setInput(text);
//       }}
//       onEndEditing={() => {
//         console.log('input is Done ~~~~~`');
//       }}
//       onSubmitEditing={() => {}}
//     />
//   </View>
// ) : (
//   <View style={styles.textContainer}>
//     <ScrollView style={styles.scrollStyle}>
//       <TouchableNativeFeedback>
//         <Text style={styles.textContent}>{input}</Text>
//       </TouchableNativeFeedback>
//     </ScrollView>
//   </View>
// )}
