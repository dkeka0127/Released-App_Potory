import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {};

const _date = '';
// const _date = '2022.04.01';

const CustomDateHeader = (props: Props) => {
  const navigation = useNavigation();
  const today = new Date();
  // const [date, setDate] = useState(new Date());
  const [newDate, setNewDate] = useState(_date);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  console.log('newDate == ', today);
  console.log('userDate == ', newDate);
  console.log('datePickerOpen == ', datePickerOpen);

  const setDatePicker = () => {
    setDatePickerOpen(true);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/*------------- date -------------*/}
      <TouchableOpacity style={styles.dateContent} onPress={setDatePicker}>
        <Text style={styles.dateText}>
          {/* {userDate === '' ? newDate : userDate} */}
          {newDate === ''
            ? String(today.toISOString()).slice(0, 10).replace(/-/gi, '.')
            : newDate}
        </Text>
        <Entypo style={styles.downIcon} name="chevron-down" size={22} />
      </TouchableOpacity>

      {datePickerOpen ? (
        <DatePicker
          modal
          mode="date"
          open={datePickerOpen}
          date={new Date()}
          onConfirm={date => {
            setDatePickerOpen(false);
            // setDate(date);
            setNewDate(
              // date.toLocaleDateString()
              String(date.toISOString()).slice(0, 10).replace(/-/gi, '.'),
            );
          }}
          onCancel={() => {
            setDatePickerOpen(false);
          }}
        />
      ) : null}

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
