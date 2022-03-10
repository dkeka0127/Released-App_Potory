import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
// Image
const profile = '../../../assets/images/userProfile.png';
// Variable
const point = 150;
const name = '리리';
const userLevel = '소꿉친구';
const photoNum = 32;
// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

function Content() {
  const UserInfoList = () => {
    return (
      <View style={styles.listContainer}>
        <FontAwesome name="bookmark-o" size={28} color="#111" />
        <View style={styles.listContent}>
          <Text style={{fontSize: 24}}>{photoNum}</Text>
          <Text style={{fontSize: 15, color: '#666'}}>
            {100 - photoNum} 개 더 모으면 다음 단계로 !
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileContainer}>
        <TouchableOpacity>
          <Image source={require(profile)} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>
            {userLevel}, {name}
          </Text>
        </View>
      </View>
      {/* Info */}
      <View style={styles.infoCon}>
        <Text style={styles.bordInfo}>• {name}님은 현재 상위 10% 입니다.</Text>
        <Text style={styles.lightInfo}>
          • 회원등급은 저장 수에 비례하여 부여
        </Text>
        <Text style={styles.lightInfo}>
          • 퍼센트는 전체 회원 수에 비례하여 산정
        </Text>
      </View>
      {/* List */}
      <UserInfoList />
      <UserInfoList />
      <UserInfoList />
    </View>
  );
}

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    height: 160,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#fff9f9',
    // borderColor: '#eee',
    // borderBottomWidth: 1,
  },
  profileImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 60,
    opacity: 0.3,
  },
  userInfo: {
    flex: 1,
    height: 80,
    marginLeft: 30,
    justifyContent: 'center',
  },
  userInfoText: {
    color: '#111',
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    height: 90,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listContent: {
    flex: 1,
    marginLeft: 18,
    paddingBottom: 2,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoCon: {
    height: 110,
    paddingLeft: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  bordInfo: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 35,
    letterSpacing: -0.4,
    color: '#111',
  },
  lightInfo: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: -0.8,
    color: '#666',
  },
});
