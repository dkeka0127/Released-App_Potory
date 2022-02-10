import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
// getStatusBarHeight() : [iPhoneX = 44 / iOS device = 20 / Other = 0]

// page
import {countryArea} from '../../../dummyData';

// 사용자 위치 권한 설정 팝업
async function requestPermission() {
  try {
    // iOS 위치 정보 수집 권한 요청
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
    // Android 위치 정보 수집 권한 요청
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  } catch (e) {
    console.log(e);
  }
}

interface ILocation {
  latitude: number;
  longitude: number;
}

const dropDownHeight = 38;
const dropDownFontSize = 14;

function MainHome() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [location, setLocation] = useState<ILocation | undefined>();

  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation({
              latitude,
              longitude,
            });
          },
          error => {
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 3600, maximumAge: 3600},
        );
      }
    });
  }, []);

  return (
    <>
      {location ? (
        <>
          <MapView
            style={{flex: 1}}
            // provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {/* -------- 유저 위치 -------- */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}>
              <Ionicons name="location" size={30} color="tomato" />
            </Marker>

            {/* -------- 스토어 위치 -------- */}
            {/* {location.map((location: ILocation, index: number) => (
              <Marker
              key={`location-${index}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}>
              <MyLocation name="location" size={30} color="tomato" />
            </Marker>
            ))} */}
            <View
              style={{
                width: 120,
                height: dropDownHeight,
                marginLeft: 15,
                marginTop: getStatusBarHeight() + 15,
                // flexDirection: 'row',
                borderRadius: 10,
                backgroundColor: '#fff',
                shadowColor: 'rgb(50, 50, 50)',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                elevation: 5,
              }}></View>
            <Text
              style={{
                width: 120,
                height: dropDownHeight,
                paddingTop: (dropDownHeight - dropDownFontSize) / 2,
                marginLeft: 15,
                marginTop: -dropDownHeight,
                fontSize: dropDownFontSize,
                textAlign: 'center',
                justifyContent: 'center',
                // textAlignVertical: 'top',
                // backgroundColor: 'yellow',
              }}>
              {countryArea.area1[0]}
              {/* <Ionicons
                style={
                  {
                    // marginLeft: 5,
                    // backgroundColor: 'pink',
                  }
                }
                name="md-chevron-down"
                size={20}
                color="#111"
              /> */}
            </Text>
          </MapView>
        </>
      ) : (
        <Text>로케이션 못받음</Text>
      )}
    </>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownContent: {
    width: '40%',
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginTop: getStatusBarHeight() + 10,
    textAlign: 'center',
  },
  locationBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    // position: 'absolute',
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    marginTop: getStatusBarHeight() + 15,
    marginLeft: 15,
    // backgroundColor: 'yellow',
    textAlign: 'center',
  },
  storeBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    // position: 'absolute',
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    marginTop: getStatusBarHeight() + 15,
    marginLeft: 15,
    // backgroundColor: 'yellow',
    textAlign: 'center',
  },
  dropDownArrow: {
    // position: 'relative',
    height: 40,
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    marginTop: getStatusBarHeight() + 15,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  dropDownText: {
    // position: 'absolute',
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 100,
    height: 35,
    backgroundColor: 'green',
    // marginTop: getStatusBarHeight() + 15,
    // height: '100%',
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    // textAlignVertical: 'center',
    // textAlign: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
});
