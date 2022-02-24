import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// Image
const profile = '../../../assets/images/image3.png';
// Variable
const point = 150;
const userLevel = '소꿉친구';
const photoNum = 32;

const UserInfo = ({title, value}) => {
  return (
    <View
      style={{
        width: '27%',
        margin: '3%',
        borderRadius: 15,
        backgroundColor: '#fcf9f5',

        elevation: 4,
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowColor: 'rgb(213, 204, 193)',
        shadowOffset: {height: 0, width: 0},
      }}></View>
  );
};

function Content() {
  return (
    <View style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profileContainer}>
        <View
          style={{
            width: 130,
            height: 130,
            marginTop: 80,
            alignItems: 'center',
            justifyContent: 'center',
            // 점선
            borderWidth: 3,
            borderRadius: 33,
            borderStyle: 'dashed',
            borderColor: '#ccc',
          }}>
          <Image
            source={require(profile)}
            style={{
              width: '98%',
              height: '98%',
              resizeMode: 'cover',
              borderRadius: 33,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: '700', color: '#333'}}>
            희희 설정 메롱
          </Text>
        </View>
        <View
          style={{
            width: '85%',
            height: 110,
            // backgroundColor: '#fee',
            margin: 30,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '44%',
              margin: '3%',
              borderRadius: 20,
              backgroundColor: '#f6f6f6',
              // 그림자
              elevation: 4,
              shadowRadius: 3,
              shadowOpacity: 0.2,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOffset: {height: 0, width: 0},
            }}
          />
          <View
            style={{
              width: '44%',
              margin: '3%',
              borderRadius: 20,
              backgroundColor: '#f6f6f6',
              // 그림자
              elevation: 4,
              shadowRadius: 3,
              shadowOpacity: 0.2,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOffset: {height: 0, width: 0},
            }}
          />
          {/* <View
            style={{
              width: '27%',
              margin: '3%',
              borderRadius: 20,
              backgroundColor: '#f6f6f6',
              // 그림자
              elevation: 4,
              shadowRadius: 3,
              shadowOpacity: 0.2,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOffset: {height: 0, width: 0},
            }}
          /> */}
        </View>
        {/* 점선 */}
        {/* <View style={styles.profileContent}>
          <Image source={require(profile)} style={styles.profileImage} />
          <View style={styles.userName}>
            <Text style={styles.userNameText}>잠자는 숲 속의 공주</Text>
          </View>
        </View> */}
      </View>
      {/* 정보 영역 */}
      {/* <View
        style={{
          width: '90%',
          height: 110,
          marginTop: 160, // a + b + ..
          flexDirection: 'row',
          // backgroundColor: '#fee',
        }}>
        <UserInfo title="회원등급" value={userLevel} />
        <UserInfo title="회원등급" value={userLevel} />
        <UserInfo title="저장된 추억 개수" value={photoNum} />
      </View> */}
    </View>
  );
}

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    width: '120%',
    height: 180,
    padding: 30,
    paddingTop: 20, // a
    alignItems: 'center',
    // backgroundColor: '#fcf9f5',
    backgroundColor: '#f6f6f6',
    // 구분선
    // borderBottomWidth: 2,
    // borderBottomColor: '#f9f4ef',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    // 그림자
    elevation: 4,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset: {height: 10, width: 0},
  },
  profileContent: {
    width: '88%',
    height: 270,
    padding: 10,
    paddingTop: 15,
    marginTop: 50, // b
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f4ef',
    // backgroundColor: '#f7f7f7',
    // 점선
    borderWidth: 2.5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#d5ccc1',
  },
  profileImage: {
    width: '100%',
    height: '78%',
    marginBottom: '7%',
    resizeMode: 'contain',
  },
  userName: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userNameText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
