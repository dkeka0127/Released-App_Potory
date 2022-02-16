import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
// Variable
const IconSize = 17;
const IconColor = '#111';

// [컴포넌트] 개별 리스트
const SettinContentList = ({iconName, title}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listContent}
      onPress={() => navigation.navigate(title)}>
      <AntDesign
        style={styles.icon}
        name={iconName}
        size={IconSize}
        color={IconColor}
      />
      <Text style={styles.font}>{title}</Text>
      <AntDesign
        style={styles.arrowIcon}
        name="right"
        size={IconSize}
        color={IconColor}
      />
    </TouchableOpacity>
  );
};

function SettingContent() {
  return (
    <ScrollView style={styles.content}>
      {/* 공지사항 */}
      <SettinContentList iconName={'notification'} title={'공지사항'} />
      {/* 자주 묻는 질문 */}
      <SettinContentList
        iconName={'questioncircleo'}
        title={'자주 묻는 질문'}
      />
      {/* 구분선 */}
      <View style={styles.devideLine} />
      {/* 서비스 이용약관 */}
      <SettinContentList iconName={'infocirlceo'} title={'서비스 이용약관'} />
      {/* 위치정보 이용약관 */}
      <SettinContentList iconName={'infocirlceo'} title={'위치정보 이용약관'} />
      {/* 개인정보 처리방침 */}
      <SettinContentList iconName={'exception1'} title={'개인정보 처리방침'} />
      {/* 구분선 */}
      <View style={styles.devideLine} />
    </ScrollView>
  );
}

export default SettingContent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  listContent: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  icon: {
    padding: 5,
    margin: 5,
  },
  arrowIcon: {
    padding: 5,
    margin: 5,
    position: 'absolute',
    right: 3,
  },
  font: {
    fontSize: 15,
  },
  devideLine: {
    height: 3,
    margin: 5,
    opacity: 0.5,
    backgroundColor: '#eee',
  },
});
