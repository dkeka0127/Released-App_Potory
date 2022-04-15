// React & Package
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageModal from 'react-native-image-modal';
import {useNavigation} from '@react-navigation/native';

// icons & images
const bgImg = '../../../assets/images/background/photoPopup_bg.png';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// variable
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const userImg = require('../../../assets/images/user/image3.png');
const userText =
  '오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다. ';
const date = '22.03.02';

//
//

export default function PhotoModal({isModal}) {
  const navigation = useNavigation();
  const [shownModal, setShownModal] = useState(false);

  // 폴라로이드 터치 시 하위 컴포넌트 렌더링 (= Modal shown)
  useEffect(() => {
    if (isModal) {
      setShownModal(true);
    }
  }, [isModal]);

  // 사진 삭제 시 동작하는 Alert
  const Delete = () => {
    Alert.alert('', '삭제 하시겠습니까 ?', [
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

  // 사진 수정 시 동작
  const Edit = () => {
    setShownModal(false);
    navigation.navigate('EditPhotoScreen');
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
          {/*===================== Content =====================*/}
          <ImageBackground source={require(bgImg)} style={styles.bgImage}>
            {/*----------------- Image -----------------*/}
            <View style={styles.imageContainer}>
              <ImageModal
                style={styles.image}
                resizeMode="contain"
                hideCloseButton={true}
                overlayBackgroundColor="#000000"
                source={userImg}
              />
            </View>

            {/*----------------- Text -----------------*/}
            <ScrollView>
              <Text style={styles.textContaier}>{userText}</Text>
            </ScrollView>
          </ImageBackground>
        </View>

        {/*===================== Footer =====================*/}
        <View style={styles.modalFooter}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.iconsContaier}>
            {/*----------------- Edit Photo -----------------*/}
            <TouchableOpacity style={styles.editIcon} onPress={Edit}>
              <MaterialIcons name="pencil-outline" size={24} color="black" />
            </TouchableOpacity>
            {/*----------------- Delete Photo -----------------*/}
            <TouchableOpacity style={styles.deleteIcon} onPress={Delete}>
              <MaterialIcons name="delete-outline" size={24} color="black" />
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
    backgroundColor: '#ccc',
  },
  bgImage: {
    flex: 1,
    margin: 1.5,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    width: '83%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: deviceWidth * 0.85 * 0.75,
    height: deviceHeight * 0.63 * 0.47,
  },
  textContaier: {
    paddingTop: 5,
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
    paddingTop: 5,
    flexDirection: 'row',
    // backgroundColor: 'pink',
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
