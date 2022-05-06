// React & packages
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

// icons
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
    props.date === ''
      ? String(today.toISOString()).slice(0, 10).replace(/-/gi, '.')
      : props.date,
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const datePickerIsOpen = () => {
    setDatePickerOpen(!datePickerOpen);
  };

  console.log(datePickerOpen);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    props.getChangedDate(date);
  }, [date]);

  return (
    <View style={styles.container}>
      {/*------------- date -------------*/}
      <TouchableOpacity style={styles.dateContent} onPress={datePickerIsOpen}>
        <Text style={styles.dateText}>{date}</Text>
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
            setDate(
              String(date.toISOString()).slice(0, 10).replace(/-/gi, '.'),
            );
          }}
          onCancel={datePickerIsOpen}
        />
      )}

      {/*------------- close -------------*/}
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={goBack}
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
