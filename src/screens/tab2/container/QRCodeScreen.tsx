import {api_storeList} from '../../../core/api/Module';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomHeader from '../../../components/header/CustomHeader';

const QRCodeScanner = ({QRLink}: any) => {
  const ref = useRef(null);
  const [scaned, setScaned] = useState<boolean>(true);
  const [storeNameList, setStoreNameList] = useState([]);

  // useEffect
  useEffect(() => {
    setScaned(true); // 종료 후 재시작 시 초기화
    getStoreNameList();
  }, []);

  // function
  const onBarCodeRead = async (event: any) => {
    if (!scaned) return;

    let response;
    response = String(event.nativeEvent.codeStringValue);
    event.nativeEvent.codeStringValue !== undefined && QRLink(response);

    setScaned(false);
  };

  // api
  const getStoreNameList = () => {
    api_storeList()
      .then(res => {
        const arr = [];
        res.data.data.map((item, idx) => {
          idx !== 0 && arr.push(item);
        });
        setStoreNameList(arr);
      })
      .catch(err => console.log('api_storeList Err', err));
  };

  // console.log(QRLink);
  console.log(storeNameList);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerTitle={'QR Code Scan'} goBackArrow={true} />
      <View style={styles.nav}>
        <Text style={{color: '#666'}}>
          * {String(storeNameList)} 를 지원합니다.
        </Text>
      </View>
      <Camera
        style={styles.scanner}
        ref={ref}
        cameraType={CameraType.Back} // Front/Back(default)
        zoomMode
        focusMode
        // Barcode Scanner Props
        scanBarcode
        showFrame={false}
        laserColor="rgba(0, 0, 0, 0)"
        frameColor="rgba(0, 0, 0, 0)"
        surfaceColor="rgba(0, 0, 0, 0)"
        onReadCode={onBarCodeRead}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
  },
  nav: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  scanner: {
    flex: 1,
    marginTop: 10,
  },
});

export default QRCodeScanner;
