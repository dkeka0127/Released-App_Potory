import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
// Variable
const IconSize = 17;
const IconColor = '#111';

// [컴포넌트] Logout / Withdrawal
const SettingAccount = ({iconName, title}) => {
  return (
    <TouchableOpacity
      style={styles.accountContent}
      onPress={() => AlertText(title)}>
      <AntDesign
        style={{paddingRight: 8}}
        name={iconName}
        size={15}
        color="gray"
      />
      <Text style={{fontSize: 14, color: 'gray'}}>{title}</Text>
    </TouchableOpacity>
  );
};

// [컴포넌트] Menu List
const SettingContentList = ({iconName, title}) => {
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

// [컴포넌트] Category Title
const SettingContectTitle = ({title}) => {
  return (
    <View style={styles.headerTitleCon}>
      <Text style={styles.headerTitleText}>{title}</Text>
    </View>
  );
};

function SettingContent() {
  // Kakao Login
  const [result, setResult] = useState<string>(''); // Kakao Login
  // 로그아웃
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
    setResult(message);
  };
  // 회원탈퇴
  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
    setResult(message);
  };

  // Alert Message
  const AlertText = title => {
    Alert.alert(
      '',
      title === '로그아웃'
        ? '로그아웃 하시겠습니까 ?'
        : '회원탈퇴 시 회원님의 소중한 추억이 \n 삭제되며 복구가 불가합니다. \n 정말로 탈퇴하시겠습니까 ?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            title === '로그아웃' ? signOutWithKakao() : unlinkKakao();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.content}>
      {/* 게시판 */}
      <SettingContectTitle title={'게시판'} />
      <SettingContentList iconName={'notification'} title={'공지사항'} />
      <SettingContentList
        iconName={'questioncircleo'}
        title={'자주 묻는 질문'}
      />
      <View style={styles.devideLine} />

      {/* 약관 및 정책 */}
      <SettingContectTitle title={'약관 및 정책'} />
      {/* <SettingContentList iconName={'infocirlceo'} title={'서비스 이용약관'} /> */}
      <SettingContentList
        iconName={'infocirlceo'}
        title={'위치정보 이용약관'}
      />
      <SettingContentList iconName={'exception1'} title={'개인정보 처리방침'} />
      <View style={styles.devideLine} />

      {/* 로그아웃/회원탈퇴 */}
      <View style={styles.accountContainer}>
        <SettingAccount iconName={'logout'} title={'로그아웃'} />
        <SettingAccount iconName={'warning'} title={'회원탈퇴'} />
      </View>
    </ScrollView>
  );
}

export default SettingContent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
  listContent: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitleCon: {
    height: 30,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerTitleText: {
    color: '#111',
    fontSize: 15,
    fontWeight: '500',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    padding: 5,
    margin: 5,
    marginLeft: 8,
  },
  arrowIcon: {
    padding: 5,
    margin: 5,
    position: 'absolute',
    right: 3,
  },
  font: {
    fontSize: 15,
    color: '#111',
  },
  devideLine: {
    height: 3,
    margin: 7,
    opacity: 0.5,
    backgroundColor: '#eee',
    // backgroundColor: '#fff',
  },
});
