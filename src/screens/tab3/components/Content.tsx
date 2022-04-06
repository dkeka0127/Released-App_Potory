import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Image
const profile = '../../../assets/images/userProfile.png';
// Variable
const point = 150;
const name = '리리';
const userLevel = '소꿉친구';
const photoNum = 32;
// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Content() {
  const [response, setResponse] = useState<any>(null); // 갤러리에서 가져온 사진 uri

  // 프로필 사진 지정
  const moveToGallery = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
  };

  // List
  const UserInfoList = ({value}) => {
    return (
      <View
        style={[
          styles.listContainer,
          {paddingLeft: value === 'photoNumber' ? 25 : 21},
        ]}>
        {value === 'photoNumber' ? (
          <FontAwesome name="bookmark-o" size={22} color="#111" />
        ) : (
          <MaterialIcons name="crown-outline" size={24} color="#111" />
        )}

        <View
          style={[
            styles.listContent,
            {marginLeft: value === 'photoNumber' ? 15 : 10},
          ]}>
          <Text
            style={{
              fontSize: value === 'photoNumber' ? 17.5 : 15.5,
              fontWeight: '600',
            }}>
            {value === 'photoNumber' ? photoNum : userLevel}
          </Text>
          <Text style={{fontSize: 13, color: '#666'}}>
            {100 - photoNum} 개 더 모으면 다음 단계로 !
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/*************** Profile ***************/}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          onPress={() => {
            moveToGallery();
          }}>
          <Image source={require(profile)} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userInfoText}>{name}</Text>
        </View>
      </View>

      {/**************** Info ****************/}
      <View style={styles.infoCon}>
        <Text style={styles.bordInfo}>• {name}님은 현재 상위 10% 입니다.</Text>
        <Text style={styles.lightInfo}>
          • 회원등급은 저장 수에 비례하여 부여
        </Text>
        <Text style={styles.lightInfo}>
          • 퍼센트는 전체 회원 수에 비례하여 산정
        </Text>
      </View>

      {/**************** List ****************/}
      <UserInfoList value="photoNumber" />
      <UserInfoList value="userLevel" />
    </ScrollView>
  );
}

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    height: 140,
    paddingLeft: 25,
    paddingRight: 25,
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
    marginLeft: 25,
    justifyContent: 'center',
  },
  userInfoText: {
    color: '#111',
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listContent: {
    flex: 1,
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
