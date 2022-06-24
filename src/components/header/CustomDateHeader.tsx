/* React & Package */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

/* icons */
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  date: string;
  getChangedDate: Function;
};

const CustomDateHeader = (props: Props) => {
  const navigation = useNavigation();

  const today = new Date();
  const [date, setDate] = useState(
    props.date === '' ? String(today.toISOString()).slice(0, 10) : props.date,
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    props.getChangedDate(date);
  }, [date]);

  const datePickerIsOpen = () => {
    setDatePickerOpen(!datePickerOpen);
  };

  const closeAlert = () => {
    Alert.alert('', '사진 저장을 취소하시겠습니까 ?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'default',
      },
      {
        text: '확인',
        onPress: () => navigation.goBack(),
        style: 'default',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/*------------- date -------------*/}
      <TouchableOpacity style={styles.dateContent} onPress={datePickerIsOpen}>
        <Text style={styles.dateText}>{date.replace(/-/gi, '.')}</Text>
        <Entypo style={styles.downIcon} name="chevron-down" size={22} />
      </TouchableOpacity>

      {datePickerOpen === true && (
        <DatePicker
          modal
          mode="date"
          locale="ko"
          title="choose the date"
          open={datePickerOpen}
          date={today}
          onConfirm={date => {
            setDatePickerOpen(false);
            setDate(String(date.toISOString()).slice(0, 10));
          }}
          onCancel={datePickerIsOpen}
        />
      )}

      {/*------------- close -------------*/}
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={closeAlert}
        hitSlop={styles.hitslop}>
        <Ionicons name="close" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomDateHeader;

const paddingTop = 5;
const paddingLeft = 8;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingTop: paddingTop,
    paddingLeft: paddingLeft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dateContent: {
    padding: 10,
    flexDirection: 'row',
  },
  dateText: {
    fontSize: 20,
  },
  downIcon: {
    paddingLeft: paddingLeft,
  },
  closeIcon: {
    paddingTop: paddingTop,
    position: 'absolute',
    right: 20,
  },
  hitslop: {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  },
});
