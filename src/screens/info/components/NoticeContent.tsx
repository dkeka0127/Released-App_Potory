import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {
    noticeNum: 1,
    mainText: '대박사꼰 앱 출시 !',
    subText: '2022.04.27',
  },
  {
    noticeNum: 2,
    mainText: '오늘은 어떤 새로운 기능이 ?',
    subText: '2022.05.27',
  },
  {
    noticeNum: 3,
    mainText: '여러분들의 소듕한 의견을 모아모아',
    subText: '2022.05.05',
  },
  {
    noticeNum: 4,
    mainText: '희희 업데이트 했다룽',
    subText: '2022.06.30',
  },
];

const NoticeList = ({noticeNum, mainText, subText}) => {
  return (
    <View style={styles.noticeContainer}>
      <View style={styles.noticeListSide}>
        <MaterialIcons name="alarm-light-outline" size={26} color="#4182e5" />
        <Text style={styles.noticeListSideText}>No.{noticeNum}</Text>
      </View>
      <View style={styles.noticeCotent}>
        <Text style={styles.cotentMainText}>{mainText}</Text>
        <Text style={styles.cotentSubText}>{subText}</Text>
      </View>
    </View>
  );
};
function NoticeContent() {
  return (
    <ScrollView style={styles.container}>
      {data.reverse().map(index => {
        return (
          <NoticeList
            key={index.noticeNum}
            noticeNum={index.noticeNum}
            mainText={index.mainText}
            subText={index.subText}
          />
        );
      })}
    </ScrollView>
  );
}

export default NoticeContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
  },
  noticeContainer: {
    height: 77,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeListSide: {
    width: 70,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noticeListSideText: {
    marginTop: 3,
    fontSize: 11,
    color: '#333',
  },
  noticeCotent: {
    padding: 10,
  },
  cotentMainText: {
    fontSize: 15,
    color: '#111',
    marginBottom: 2,
  },
  cotentSubText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
    marginBottom: 2,
  },
});
