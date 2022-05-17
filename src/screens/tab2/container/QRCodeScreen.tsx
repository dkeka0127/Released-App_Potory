import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomHeader from '../../../components/header/CustomHeader';

const QRCodeScanner = ({QRLink}: any) => {
  // console.log(QRLink);
  const [scaned, setScaned] = useState<boolean>(true);
  const ref = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = async (event: any) => {
    if (!scaned) return;

    let response;
    response = String(event.nativeEvent.codeStringValue);
    event.nativeEvent.codeStringValue !== undefined && QRLink(response);

    setScaned(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerTitle={'QR Code Scan'} goBackArrow={true} />
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
  scanner: {
    flex: 1,
    marginTop: 10,
  },
});

export default QRCodeScanner;
