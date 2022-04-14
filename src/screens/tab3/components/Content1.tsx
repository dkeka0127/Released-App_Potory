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

function Content1() {
  return (
    <View style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profileContainer}>
        <View
          style={{
            width: 130,
            height: 130,
            marginTop: 75,
            alignItems: 'center',
            justifyContent: 'center',
            // 점선
            borderWidth: 3,
            borderRadius: 33,
            borderStyle: 'dashed',
            borderColor: '#ccc',
            // borderColor: '#cccccc',
            // borderColor: '#bbb',
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
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#333',
            }}>
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
              // backgroundColor: '#fcefef',
              // backgroundColor: '#f2f4f7',
              justifyContent: 'center',
              alignItems: 'center',
              // 그림자
              elevation: 4,
              shadowRadius: 3,
              shadowOpacity: 0.4,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOffset: {height: 0, width: 0},
            }}>
            <Text
              style={{
                height: 56,
                paddingTop: 15,
                marginTop: 6,
                color: '#333',
                fontSize: 19,
                fontWeight: '700',
                textAlign: 'center',
              }}>
              소꿉친구
            </Text>
            <Text
              style={{
                height: 25,
                color: '#333',
                fontSize: 15,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              회원등급
            </Text>
          </View>
          <View
            style={{
              width: '44%',
              margin: '3%',
              borderRadius: 20,
              alignItems: 'center',
              backgroundColor: '#f6f6f6',
              // backgroundColor: '#fcefef',
              // backgroundColor: '#f2f4f7',
              // 그림자
              elevation: 4,
              shadowRadius: 3,
              shadowOpacity: 0.4,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOffset: {height: 0, width: 0},
            }}>
            <Text
              style={{
                height: 58,
                paddingTop: 12,
                marginTop: 3,
                color: '#333',
                fontSize: 23,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              12
            </Text>
            <Text
              style={{
                height: 25,
                color: '#333',
                fontSize: 15,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              저장 된 기록
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Content1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
  },
  profileContainer: {
    width: '120%',
    height: 170,
    padding: 30,
    paddingTop: 20, // a
    alignItems: 'center',
    // backgroundColor: '#fcf9f5',
    backgroundColor: '#f6f6f6',
    // backgroundColor: '#fcefef',
    // backgroundColor: '#f2f4f7',
    // 구분선
    // borderBottomWidth: 2,
    // borderBottomColor: '#f9f4ef',
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 140,
    // 그림자
    elevation: 4,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    // shadowColor: 'rgb(100, 100, 100)',
    // shadowColor: 'rgb(150, 34, 34)',
    shadowColor: 'rgb(51, 73, 107)',
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
