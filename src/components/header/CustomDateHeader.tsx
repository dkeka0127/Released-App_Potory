// React & packages
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  date: string;
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

  const setDatePickerTrue = () => {
    setDatePickerOpen(true);
  };

  const setDatePickerFalse = () => {
    setDatePickerOpen(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/*------------- date -------------*/}
      <TouchableOpacity style={styles.dateContent} onPress={setDatePickerTrue}>
        <Text style={styles.dateText}>{date}</Text>
        <Entypo style={styles.downIcon} name="chevron-down" size={22} />
      </TouchableOpacity>

      {datePickerOpen === true && (
        <DatePicker
          modal
          mode="date"
          locale="ko"
          title="o_<"
          open={datePickerOpen}
          date={new Date()}
          onConfirm={date => {
            setDatePickerOpen(false);
            setDate(
              String(date.toISOString()).slice(0, 10).replace(/-/gi, '.'),
            );
          }}
          onCancel={setDatePickerFalse}
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
