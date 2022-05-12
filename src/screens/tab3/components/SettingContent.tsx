// React & Package
import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

// kakao_login
// import {
//   KakaoOAuthToken,
//   KakaoProfile,
//   getProfile as getKakaoProfile,
//   login,
//   logout,
//   unlink,
// } from '@react-native-seoul/kakao-login';

// api
import {api_deleteDevice} from 'core/api/Module';

// variable
import {userNum} from '../../../core/UserInfo';
const IconSize = 17;
const IconColor = '#111';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// List Components
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

// Category Title
const SettingContectTitle = ({title}) => {
  return (
    <View style={styles.headerTitleCon}>
      <Text style={styles.headerTitleText}>{title}</Text>
    </View>
  );
};

//
//
//

function SettingContent() {
  const navigation = useNavigation();

  // Kakao Login
  const [result, setResult] = useState<string>('');

  // function
  const AlertText = (title: string) => {
    Alert.alert(
      '',
      title === '로그아웃'
        ? '로그아웃 하시겠습니까 ?'
        : '회원탈퇴 시 회원님의 소중한 추억이\n삭제되며 복구가 불가합니다.\n정말로 탈퇴하시겠습니까 ?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
        },
        {
          text: '확인',
          onPress: () => (title === '로그아웃' ? logOut() : signOut()),
          style: 'default',
        },
      ],
    );
  };

  const logOut = () => {
    signOutWithKakao();
    AsyncStorage.setItem('login', 'false');
    Alert.alert('', '로그아웃 되었습니다.', [
      {
        text: '확인',
        onPress: () => NativeModules.DevSettings.reload(),
        style: 'default',
      },
    ]);
  };

  const signOut = () => {
    unlinkKakao();
    connectAPI_deleteUser();
    AsyncStorage.setItem('login', 'false');
    Alert.alert('', '회원탈퇴 되었습니다.', [
      {
        text: '확인',
        onPress: () => NativeModules.DevSettings.reload(),
        style: 'default',
      },
    ]);
  };

  // 로그아웃
  const signOutWithKakao = async (): Promise<void> => {
    // const message = await logout();
    // setResult(message);
  };
  // 회원탈퇴
  const unlinkKakao = async (): Promise<void> => {
    // const message = await unlink();
    // setResult(message);
  };

  const connectAPI_deleteUser = () => {
    api_deleteDevice(userNum)
      .then(res => console.log('api_deleteDevice Success == ', res))
      .catch(err => console.log('api_deleteDevice Err == ', err));
  };

  // component
  const SettingAccount = ({iconName, title}: any) => {
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

  return (
    <ScrollView style={styles.content}>
      {/*------------------------ 게시판 ------------------------*/}
      <SettingContectTitle title={'게시판'} />
      <SettingContentList iconName={'notification'} title={'공지사항'} />
      <SettingContentList
        iconName={'questioncircleo'}
        title={'자주 묻는 질문'}
      />
      <View style={styles.devideLine} />

      {/*---------------------- 약관 및 정책 ----------------------*/}
      <SettingContectTitle title={'약관 및 정책'} />
      {/* <SettingContentList iconName={'infocirlceo'} title={'서비스 이용약관'} /> */}
      <SettingContentList
        iconName={'infocirlceo'}
        title={'위치정보 이용약관'}
      />
      <SettingContentList iconName={'exception1'} title={'개인정보 처리방침'} />
      <View style={styles.devideLine} />

      {/*--------------------- 로그아웃/회원탈퇴 ---------------------*/}
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
    height: 55,
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
    padding: 2,
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
    height: 2.5,
    margin: 9,
    opacity: 0.5,
    backgroundColor: '#f1eff4',
  },
});
