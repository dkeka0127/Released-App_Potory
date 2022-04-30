// React & Package
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {
    noticeNum: 1,
    mainText: '포토리의 첫번째 생일이애오 !',
    date: '2022.05.27',
  },
  // {
  //   noticeNum: 2,
  //   mainText: '오늘은 어떤 새로운 기능이 ?',
  //   date: '2022.05.27',
  // },
  // {
  //   noticeNum: 3,
  //   mainText: '여러분들의 소듕한 의견을 모아모아',
  //   date: '2022.05.05',
  // },
  // {
  //   noticeNum: 4,
  //   mainText: '희희 업데이트 했다룽',
  //   date: '2022.06.30',
  // },
];

interface Props {
  noticeNum: number;
  mainText: string;
  date: string;
}

function NoticeContent() {
  // 공지사항 컴포넌트
  const NoticeList = ({noticeNum, mainText, date}) => {
    return (
      <View style={styles.noticeContainer}>
        <View style={styles.noticeListSide}>
          <MaterialIcons name="alarm-light-outline" size={26} color="#ed745e" />
          <Text style={styles.noticeListSideText}>No.{noticeNum}</Text>
        </View>
        <View style={styles.noticeCotent}>
          <Text style={styles.cotentMainText}>{mainText}</Text>
          <Text style={styles.cotentSubText}>{date}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {data.reverse().map(index => {
        return (
          <NoticeList
            key={index.noticeNum}
            noticeNum={index.noticeNum}
            mainText={index.mainText}
            date={index.date}
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
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    marginBottom: 90,
  },
  noticeContainer: {
    height: 77,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  noticeListSide: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: 'center',
  },
  noticeListSideText: {
    fontWeight: '500',
    marginTop: 3,
    fontSize: 11,
    color: '#dd5f49',
  },
  noticeCotent: {
    padding: 8,
  },
  cotentMainText: {
    fontSize: 15,
    fontWeight: '500',
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
