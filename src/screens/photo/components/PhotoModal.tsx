import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';

// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

// Variable
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// Image
const bgImg = '../../../assets/images/MainPhoto_bg.png';

export default function PhotoModal({isModal}) {
  const navigation = useNavigation();
  const [shownModal, setShownModal] = useState(false);

  // 폴라로이드 터치 시 하위 컴포넌트 렌더링 (= Modal shown)
  useEffect(() => {
    if (isModal) {
      setShownModal(true);
    }
  }, [isModal]);

  // Delete Image 클릭 시 Alert 출력
  const deleteAlert = () => {
    Alert.alert('삭제 하시겠습니까 ?', '', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => {
          setShownModal(false);
        },
      },
    ]);
  };

  return (
    <Modal
      style={styles.container}
      isVisible={shownModal ? true : false}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.7}
      onBackdropPress={() => {
        setShownModal(false);
      }}>
      <View style={styles.content}>
        <View style={styles.modalContent}>
          <ImageBackground source={require(bgImg)} style={styles.bgImage}>
            {/* Image */}
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/image3.png')}
                style={styles.image}
              />
            </View>

            {/* Text */}
            <ScrollView>
              <Text style={styles.textContaier}>
                오늘은 인스타스토리를 봤다. {'\n'}열받을 뻔 했다.{'\n'}하지만
                내가 이겼군 후후 기분이 나쁘지만 나쁘지 않다.{'\n'}있었는데요
                없었습니다 뭐 약간 그런느낌 ?{'\n'}
                {'\n'}있었는데요 없었습니다 뭐 약간 그런느낌 ?{'\n'}
              </Text>
            </ScrollView>
          </ImageBackground>
        </View>

        {/* Footer */}
        <View style={styles.modalFooter}>
          <Text style={styles.date}>22.03.02</Text>
          <View style={styles.iconsContaier}>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                setShownModal(false);
                navigation.navigate('EditPhotoScreen');
              }}>
              <MaterialIcons name="pencil-outline" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => {
                deleteAlert();
              }}>
              <MaterialIcons name="delete-outline" size={27} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: deviceWidth * 0.85,
    height: deviceHeight * 0.63,
    padding: 18,
    paddingBottom: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalContent: {
    height: '88%',
  },
  bgImage: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: '65%',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContaier: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  modalFooter: {
    height: '12%',
    paddingTop: 10,
    paddingBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
  },
  iconsContaier: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  editIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  deleteIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
    alignItems: 'center',
  },
});
