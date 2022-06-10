/* React & Package */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

/* custom components */
import Toast from '../../../components/Toast/Toast';
import Loading from '../../../components/Loading';

/* api */
import {api_noticeList} from '../../../../src/core/api/Module';

/* icons */
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  noticeNum: number;
  mainText: string;
  date: string;
}

// component
const NoticeList = ({noticeNum, mainText, date}: Props) => {
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

function NoticeContent() {
  const [noticeListData, setNoticeListData] = useState([]);

  // useEffect
  useEffect(() => {
    connectAPI();
  }, []);

  /* api */
  const connectAPI = () => {
    api_noticeList()
      .then(res => {
        setNoticeListData(res.data.data);
        console.log('Notice List Success == ');
      })
      .catch(err => {
        console.log('Notice List Err == ', err);
        Toast.show(
          '데이터를 불러오는 데에 실패하였습니다.\n잠시 후 다시 시도해주세요.',
        );
      });

    return;
  };

  if (noticeListData === []) return <Loading />;

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      {/* noticeListData.reverse().map */}
      {noticeListData.map((item: any) => {
        return (
          <NoticeList
            key={item.notice_idx}
            noticeNum={item.notice_idx}
            mainText={item.title}
            date={item.create_date.slice(0, 10)}
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
    // backgroundColor: 'pink',
  },
  noticeContainer: {
    width: '100%',
    // height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noticeListSide: {
    width: '20%',
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
    width: '80%',
    paddingTop: 25,
    paddingBottom: 25,
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
