import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
// Icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Page
import CustomHeader from '../../common/CustomHeader';
import {ScrollView} from 'react-native-gesture-handler';
// Image
const backgroundImg = '../../../assets/images/photoModify_bg.png';

function EditPhotoScreen() {
  const [userDate, setUserDate] = useState('2020.03.03');
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState('00');
  const [month, setMonth] = useState('00');
  const [year, setYear] = useState('0000');
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginBottom: -40,
        backgroundColor: '#fff',
      }}>
      <CustomHeader
        headerTitle="기록 수정"
        goBackArrow={true}
        navigation={navigation}
      />
      <ImageBackground source={require(backgroundImg)} style={styles.container}>
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
                  String(date.toISOString()).slice(0, 10).replace(/-/gi, '.'),
                );
              }}
              onCancel={() => {
                setDatePickerOpen(false);
              }}
            />
          ) : null}
        </View>

        {/* Text */}
        <View
          style={{
            width: '100%',
            height: 270,
            paddingLeft: '3%',
            paddingRight: '3%',
            paddingTop: 20,
            // paddingBottom: 10,
            // backgroundColor: '#fef',
          }}>
          <ScrollView
            style={{
              paddingLeft: '10%',
              paddingRight: '10%',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                lineHeight: 28,
                letterSpacing: -0.7,
              }}>
              오늘은 3월 3일{'\n'}다음주면 대통령 선거날이다. 뽀앵 배고팡 ㅇㅅㅇ
              {'\n'}
              근데 누굴 뽑아야 할 지 머르겠는데 어떠카지 ? {'\n'}그냥 내가
              뽑혔으면 좋겠다{'\n'}
              오늘 아침 9시에 날씨 좋다고 느끼면서 출근했는데 벌써 오후 8시다
              {'\n'}
              오늘 논너가기 조은 날이라던데 .. 다들 내 몫까지 놀아주라 희희 ..
            </Text>
          </ScrollView>
        </View>

        <TouchableOpacity
          style={{
            width: '100%',
            paddingRight: 25,
            alignItems: 'flex-end',
          }}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={30}
            color="#111"
          />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default EditPhotoScreen;

const styles = StyleSheet.create({
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
});
