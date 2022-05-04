import React, {useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, StyleSheet} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomHeader from '../../../components/header/CustomHeader';

const QRCodeScanner = () => {
  const [scaned, setScaned] = useState<boolean>(true);
  const ref = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScaned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    if (!scaned) return;
    setScaned(false);
    console.log('QR event == ', event);
    //   { dispatchConfig: { registrationName: 'onReadCode' },
    // _targetInst:
    //  { tag: 5,
    //    key: null,
    //    elementType: 'CKCamera',
    //    type: 'CKCamera',
    //    stateNode:
    //     { _nativeTag: 669,
    //       _children: [],
    //       viewConfig:
    //        { baseModuleName: 'RCTView',
    //          Manager: 'CKCameraManager',
    //          NativeProps:
    //           { saveToCameraRoll: 'BOOL',
    //             onOrientationChange: 'BOOL',
    //             laserColor: 'UIColor',
    //             focusMode: 'CKCameraFocusMode',
    //             zoomMode: 'CKCameraZoomMode',
    //             showFrame: 'BOOL',
    //             cameraType: 'CKCameraType',
    //             ratioOverlay: 'NSString',
    //             saveToCameraRollWithPhUrl: 'BOOL',
    //             resetFocusWhenMotionDetected: 'BOOL',
    //             torchMode: 'CKCameraTorchMode',
    //             frameColor: 'UIColor',
    //             resetFocusTimeout: 'NSInteger',
    //             onReadCode: 'BOOL',
    //             flashMode: 'CKCameraFlashMode',
    //             ratioOverlayColor: 'UIColor' },
    //          bubblingEventTypes:
    //           { topChange: { phasedRegistrationNames: { captured: 'onChangeCapture', bubbled: 'onChange' } },
    //             topFocus: { phasedRegistrationNames: { captured: 'onFocusCapture', bubbled: 'onFocus' } },
    //             topSubmitEditing:
    //              { phasedRegistrationNames:
    //                 { captured: 'onSubmitEditingCapture',
    //                   bubbled: 'onSubmitEditing' } },
    //             topTouchEnd: { phasedRegistrationNames: { captured: 'onTouchEndCapture', bubbled: 'onTouchEnd' } },
    //             topBlur: { phasedRegistrationNames: { captured: 'onBlurCapture', bubbled: 'onBlur' } },
    //             topTouchStart: { phasedRegistrationNames: { captured: 'onTouchStartCapture', bubbled: 'onTouchStart' } },
    //             topTouchMove: { phasedRegistrationNames: { captured: 'onTouchMoveCapture', bubbled: 'onTouchMove' } },
    //             topEndEditing: { phasedRegistrationNames: { captured: 'onEndEditingCapture', bubbled: 'onEndEditing' } },
    //             topTouchCancel: { phasedRegistrationNames: { captured: 'onTouchCancelCapture', bubbled: 'onTouchCancel' } },
    //             topKeyPress: { phasedRegistrationNames: { captured: 'onKeyPressCapture', bubbled: 'onKeyPress' } },
    //             topPress: { phasedRegistrationNames: { captured: 'onPressCapture', bubbled: 'onPress' } } },
    //          directEventTypes:
    //           { topAccessibilityTap: { registrationName: 'onAccessibilityTap' },
    //             topMagicTap: { registrationName: 'onMagicTap' },
    //             topLayout: { registrationName: 'onLayout' },
    //             topAccessibilityAction: { registrationName: 'onAccessibilityAction' },
    //             topAccessibilityEscape: { registrationName: 'onAccessibilityEscape' },
    //             topReadCode: { registrationName: 'onReadCode' },
    //             topOrientationChange: { registrationName: 'onOrientationChange' } },
    //          Constants: [Getter/Setter],
    //          Commands: [Getter/Setter],
    //          uiViewClassName: 'CKCamera',
    //          validAttributes:
    //           { aspectRatio: true,
    //             flexWrap: true,
    //             height: true,
    //             borderTopEndRadius: true,
    //             accessibilityRole: true,
    //             paddingTop: true,
    //             accessibilityElementsHidden: true,
    //             flexShrink: true,
    //             flexDirection: true,
    //             maxWidth: true,
    //             borderLeftWidth: true,
    //             backgroundColor: { diff: null, process: [Function: processColor] },
    //             display: true,
    //             borderBottomRightRadius: true,
    //             onLayout: true,
    //             borderTopWidth: true,
    //             borderRightWidth: true,
    //             borderLeftColor: { diff: null, process: [Function: processColor] },
    //             zIndex: true,
    //             collapsable: true,
    //             paddingStart: true,
    //             borderTopRightRadius: true,
    //             hitSlop: { diff: [Function: insetsDiffer], process: null },
    //             onMagicTap: true,
    //             borderTopLeftRadius: true,
    //             marginStart: true,
    //             flex: true,
    //             borderBottomEndRadius: true,
    //             borderEndColor: { diff: null, process: [Function: processColor] },
    //             borderColor: { diff: null, process: [Function: processColor] },
    //             maxHeight: true,
    //             nativeID: true,
    //             paddingLeft: true,
    //             paddingRight: true,
    //             start: true,
    //             borderTopColor: { diff: null, process: [Function: processColor] },
    //             minWidth: true,
    //             alignSelf: true,
    //             borderRadius: true,
    //             paddingEnd: true,
    //             accessibilityValue: true,
    //             transform: { diff: [Function: matricesDiffer], process: null },
    //             accessible: true,
    //             borderStartColor: { diff: null, process: [Function: processColor] },
    //             shouldRasterizeIOS: true,
    //             bottom: true,
    //             paddingBottom: true,
    //             shadowRadius: true,
    //             marginTop: true,
    //             borderWidth: true,
    //             minHeight: true,
    //             flexGrow: true,
    //             accessibilityState: true,
    //             accessibilityIgnoresInvertColors: true,
    //             borderRightColor: { diff: null, process: [Function: processColor] },
    //             borderBottomLeftRadius: true,
    //             needsOffscreenAlphaCompositing: true,
    //             width: true,
    //             paddingHorizontal: true,
    //             marginLeft: true,
    //             shadowOpacity: true,
    //             alignItems: true,
    //             removeClippedSubviews: true,
    //             borderBottomColor: { diff: null, process: [Function: processColor] },
    //             backfaceVisibility: true,
    //             shadowOffset: { diff: [Function: sizesDiffer], process: null },
    //             justifyContent: true,
    //             pointerEvents: true,
    //             marginVertical: true,
    //             borderBottomWidth: true,
    //             direction: true,
    //             marginBottom: true,
    //             end: true,
    //             right: true,
    //             borderBottomStartRadius: true,
    //             borderTopStartRadius: true,
    //             shadowColor: { diff: null, process: [Function: processColor] },
    //             accessibilityLabel: true,
    //             accessibilityHint: true,
    //             borderEndWidth: true,
    //             alignContent: true,
    //             accessibilityViewIsModal: true,
    //             padding: true,
    //             borderStyle: [TOO BIG formatValueCalls 201 exceeded limit of 200],
    //             marginHorizontal: [TOO BIG formatValueCalls 202 exceeded limit of 200],
    //             onAccessibilityAction: [TOO BIG formatValueCalls 203 exceeded limit of 200],
    //             opacity: [TOO BIG formatValueCalls 204 exceeded limit of 200],
    //             onAccessibilityEscape: [TOO BIG formatValueCalls 205 exceeded limit of 200],
    //             onAccessibilityTap: [TOO BIG formatValueCalls 206 exceeded limit of 200],
    //             accessibilityActions: [TOO BIG formatValueCalls 207 exceeded limit of 200],
    //             position: [TOO BIG formatValueCalls 208 exceeded limit of 200],
    //             overflow: [TOO BIG formatValueCalls 209 exceeded limit of 200],
    //             marginRight: [TOO BIG formatValueCalls 210 exceeded limit of 200],
    //             testID: [TOO BIG formatValueCalls 211 exceeded limit of 200],
    //             margin: [TOO BIG formatValueCalls 212 exceeded limit of 200],
    //             paddingVertical: [TOO BIG formatValueCalls 213 exceeded limit of 200],
    //             top: [TOO BIG formatValueCalls 214 exceeded limit of 200],
    //             marginEnd: [TOO BIG formatValueCalls 215 exceeded limit of 200],
    //             flexBasis: [TOO BIG formatValueCalls 216 exceeded limit of 200],
    //             borderStartWidth: [TOO BIG formatValueCalls 217 exceeded limit of 200],
    //             left: [TOO BIG formatValueCalls 218 exceeded limit of 200],
    //             saveToCameraRoll: [TOO BIG formatValueCalls 219 exceeded limit of 200],
    //             onOrientationChange: [TOO BIG formatValueCalls 220 exceeded limit of 200],
    //             laserColor: [TOO BIG formatValueCalls 221 exceeded limit of 200],
    //             focusMode: [TOO BIG formatValueCalls 222 exceeded limit of 200],
    //             zoomMode: [TOO BIG formatValueCalls 223 exceeded limit of 200],
    //             showFrame: [TOO BIG formatValueCalls 224 exceeded limit of 200],
    //             cameraType: [TOO BIG formatValueCalls 225 exceeded limit of 200],
    //             ratioOverlay: [TOO BIG formatValueCalls 226 exceeded limit of 200],
    //             saveToCameraRollWithPhUrl: [TOO BIG formatValueCalls 227 exceeded limit of 200],
    //             resetFocusWhenMotionDetected: [TOO BIG formatValueCalls 228 exceeded limit of 200],
    //             torchMode: [TOO BIG formatValueCalls 229 exceeded limit of 200],
    //             frameColor: [TOO BIG formatValueCalls 230 exceeded limit of 200],
    //             resetFocusTimeout: [TOO BIG formatValueCalls 231 exceeded limit of 200],
    //             onReadCode: [TOO BIG formatValueCalls 232 exceeded limit of 200],
    //             flashMode: [TOO BIG formatValueCalls 233 exceeded limit of 200],
    //             ratioOverlayColor: [TOO BIG formatValueCalls 234 exceeded limit of 200],
    //             style: [TOO BIG formatValueCalls 235 exceeded limit of 200] } },
    //       _internalFiberInstanceHandleDEV: [Circular] },
    //    return: [TOO BIG formatValueCalls 236 exceeded limit of 200],
    //    child: [TOO BIG formatValueCalls 237 exceeded limit of 200],
    //    sibling: [TOO BIG formatValueCalls 238 exceeded limit of 200],
    //    index: [TOO BIG formatValueCalls 239 exceeded limit of 200],
    //    ref: [TOO BIG formatValueCalls 240 exceeded limit of 200],
    //    pendingProps: [TOO BIG formatValueCalls 241 exceeded limit of 200],
    //    memoizedProps: [TOO BIG formatValueCalls 242 exceeded limit of 200],
    //    updateQueue: [TOO BIG formatValueCalls 243 exceeded limit of 200],
    //    memoizedState: [TOO BIG formatValueCalls 244 exceeded limit of 200],
    //    dependencies: [TOO BIG formatValueCalls 245 exceeded limit of 200],
    //    mode: [TOO BIG formatValueCalls 246 exceeded limit of 200],
    //    flags: [TOO BIG formatValueCalls 247 exceeded limit of 200],
    //    subtreeFlags: [TOO BIG formatValueCalls 248 exceeded limit of 200],
    //    deletions: [TOO BIG formatValueCalls 249 exceeded limit of 200],
    //    lanes: [TOO BIG formatValueCalls 250 exceeded limit of 200],
    //    childLanes: [TOO BIG formatValueCalls 251 exceeded limit of 200],
    //    alternate: [TOO BIG formatValueCalls 252 exceeded limit of 200],
    //    actualDuration: [TOO BIG formatValueCalls 253 exceeded limit of 200],
    //    actualStartTime: [TOO BIG formatValueCalls 254 exceeded limit of 200],
    //    selfBaseDuration: [TOO BIG formatValueCalls 255 exceeded limit of 200],
    //    treeBaseDuration: [TOO BIG formatValueCalls 256 exceeded limit of 200],
    //    _debugSource: [TOO BIG formatValueCalls 257 exceeded limit of 200],
    //    _debugOwner: [TOO BIG formatValueCalls 258 exceeded limit of 200],
    //    _debugNeedsRemount: [TOO BIG formatValueCalls 259 exceeded limit of 200],
    //    _debugHookTypes: [TOO BIG formatValueCalls 260 exceeded limit of 200] },
    // _dispatchListeners: [TOO BIG formatValueCalls 261 exceeded limit of 200],
    // _dispatchInstances: [TOO BIG formatValueCalls 262 exceeded limit of 200],
    // nativeEvent: [TOO BIG formatValueCalls 263 exceeded limit of 200],
    // type: [TOO BIG formatValueCalls 264 exceeded limit of 200],
    // target: [TOO BIG formatValueCalls 265 exceeded limit of 200],
    // currentTarget: [TOO BIG formatValueCalls 266 exceeded limit of 200],
    // eventPhase: [TOO BIG formatValueCalls 267 exceeded limit of 200],
    // bubbles: [TOO BIG formatValueCalls 268 exceeded limit of 200],
    // cancelable: [TOO BIG formatValueCalls 269 exceeded limit of 200],
    // timeStamp: [TOO BIG formatValueCalls 270 exceeded limit of 200],
    // defaultPrevented: [TOO BIG formatValueCalls 271 exceeded limit of 200],
    // isTrusted: [TOO BIG formatValueCalls 272 exceeded limit of 200],
    // isDefaultPrevented: [TOO BIG formatValueCalls 273 exceeded limit of 200],
    // isPropagationStopped: [TOO BIG formatValueCalls 274 exceeded limit of 200] }
    console.log('QR event.nativeEvent == ', event.nativeEvent);
    // { target: 669, codeStringValue: 'naver' }
    console.log(
      'QR event.nativeEvent.codeStringValue == ',
      event.nativeEvent.codeStringValue,
    );
    // 'naver'
    Alert.alert('QR Code', event.nativeEvent.codeStringValue, [
      {text: 'OK', onPress: () => setScaned(true)},
    ]);
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
