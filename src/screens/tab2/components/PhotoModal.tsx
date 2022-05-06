// React & package
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageModal from 'react-native-image-modal';
import {useNavigation} from '@react-navigation/native';

// icons & images
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const userImg = require('../../../assets/images/user/image2.png');

// variable
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const ModalWidth = deviceWidth * 0.85;
const ModalHeight = deviceHeight * 0.6;

const userText =
  '오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.\n오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타\n 스토리를 봤다.오늘은 인스타 스토리를 봤다.늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤\n다.오늘은 인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다. ';
const date = '22.03.02';

//
//
//

export default function PhotoModal({isModal}: any) {
  const navigation = useNavigation();
  const [shownModal, setShownModal] = useState(false);

  // set Modal Shown
  useEffect(() => {
    if (isModal) {
      setShownModal(true);
    }
  }, [isModal]);

  // 사진 수정
  const Edit = () => {
    setShownModal(false);
    navigation.navigate('EditPhotoScreen');
  };

  // 사진 삭제 Alert
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

  return (
    <Modal
      style={styles.container}
      isVisible={shownModal ? true : false}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.7}
      onBackdropPress={() => setShownModal(false)}>
      {/*===================== header =====================*/}
      <View style={styles.header}>
        <Text>{date}</Text>
        <View style={styles.headerIcon}>
          <TouchableOpacity style={styles.editIcon} onPress={Edit}>
            <MaterialIcons name="pencil-outline" size={22} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteIcon} onPress={Delete}>
            <MaterialIcons name="delete-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      {/*====================== image ======================*/}
      <View style={styles.image}>
        <ImageModal
          style={styles.imageModal}
          resizeMode="contain"
          hideCloseButton={true}
          overlayBackgroundColor="#000000"
          source={userImg}
        />
      </View>

      {/*================== divided line ==================*/}
      <View style={styles.divideLineContainer}>
        <View style={styles.devideLine} />
      </View>

      {/*====================== text ======================*/}
      <View style={styles.text}>
        <ScrollView style={styles.textScrollView}>
          <Text style={styles.textStyle}>{userText}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

const BGColor = '#f5f4fc';
// const BGColor = '#fff';
const BorderRadius = 10;
const ImageHeight = 0.71;
const ImageHeightMargin = 0.04;
const TextHeight = 1 - ImageHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: ModalWidth,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BGColor,
    borderTopLeftRadius: BorderRadius,
    borderTopRightRadius: BorderRadius,
  },
  headerIcon: {
    flexDirection: 'row',
  },
  editIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: ModalWidth,
    height: ModalHeight * ImageHeight, // ModalHeight 7:3
    backgroundColor: '#fff',
  },
  imageModal: {
    width: ModalWidth * 0.9,
    marginLeft: ModalWidth * 0.05,
    marginRight: ModalWidth * 0.05,

    height: ModalHeight * (ImageHeight - ImageHeightMargin * 2), // ModalHeight 0.7 (0.65 + 0.25 = 0.25)
    marginTop: ModalHeight * ImageHeightMargin, // ModalHeight 0.7 (0.65 + 0.25 = 0.25)
    marginBottom: ModalHeight * ImageHeightMargin, // ModalHeight 0.7 (0.65 + 0.25 = 0.25)
  },

  text: {
    width: ModalWidth,
    height: ModalHeight * TextHeight, // ModalHeight 7:3
    backgroundColor: BGColor,
    borderBottomLeftRadius: BorderRadius,
    borderBottomRightRadius: BorderRadius,
  },
  textScrollView: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: BorderRadius,
  },
  textStyle: {
    paddingTop: 0,
    paddingBottom: 20,
  },

  divideLineContainer: {
    width: ModalWidth,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  devideLine: {
    width: ModalWidth * 0.8,
    height: 1,
    backgroundColor: '#dcdaea',
  },
});
