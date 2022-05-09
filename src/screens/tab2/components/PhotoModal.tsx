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
const userImg = require('../../../assets/images/user/image4.png');

// variable
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const ModalWidth = deviceWidth * 0.85;
const ModalHeight = deviceHeight * 0.51;

const userText =
  '인스타 스토리를 봤다.오늘은 인스타 스\n토인스타 스토리를 봤다.오늘은 인스타 스토리를 봤다. ';
const date = '22.03.02';

//
//
//

interface Props {
  isModalShown: boolean;
  modalImgPath: string;
}

export default function PhotoModal({isModalShown, modalImgPath}: Props) {
  const navigation = useNavigation();
  const [shownModal, setShownModal] = useState(false);

  console.log('==', modalImgPath);
  // function
  const moveToEditScreen = () => {
    setShownModal(false);
    navigation.navigate('EditPhotoScreen');
  };

  const alertBeforeDelete = () => {
    Alert.alert('', '삭제 하시겠습니까 ?', [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: deletePhoto,
      },
    ]);
  };

  const deletePhoto = () => {
    setShownModal(false);
  };

  // useEffect
  useEffect(() => {
    if (isModalShown) {
      setShownModal(true);
    }
  }, [isModalShown]);

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
        <View style={styles.haederTextCon}>
          {/* <View style={styles.headerCircleShape} /> */}
          <Text style={styles.headerText}>{date}</Text>
        </View>
        <View style={styles.headerIcon}>
          <TouchableOpacity style={styles.editIcon} onPress={moveToEditScreen}>
            <MaterialIcons name="pencil-outline" size={22} color="#5d5963" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={alertBeforeDelete}>
            <MaterialIcons name="delete-outline" size={24} color="#5d5963" />
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
      {/* <View style={styles.divideLineContainer}>
        <View style={styles.devideLine} />
      </View> */}

      {/*====================== text ======================*/}
      <View style={styles.text}>
        <ScrollView style={styles.textScrollView}>
          <Text style={styles.textStyle}>{userText}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

// const BGColor = '#fff';
const BGColor = '#f9f7ff';
const BorderRadius = 10;
const ImageHeight = 0.7;
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
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BGColor,
    borderTopLeftRadius: BorderRadius,
    borderTopRightRadius: BorderRadius,
  },
  haederTextCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCircleShape: {
    width: 31,
    height: 25,
    marginRight: -17,
    backgroundColor: '#cfc7e2',
    borderRadius: 30,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '500',
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
    height: ModalHeight * ImageHeight + 10, // ModalHeight 7:3
    paddingTop: 5,
    paddingBottom: 5,
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
    marginTop: 15,
    paddingTop: 8,
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
    backgroundColor: '#e1dced',
  },
});
