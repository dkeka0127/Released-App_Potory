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
  const [dropdownItems, setDropdownItems] = useState(countryArea.area1);
  const [closeAfterSelecting, setCloseAfterSelecting] = useState(false);
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
            onPress={() => {
              setOpen(false);
              console.log('hihi');
            }}
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
            {/* <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}>
              <Ionicons name="location" size={30} color="tomato" />
            </Marker> */}

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
          </MapView>

          <DropDownPicker
            // disabled={true}
            onChangeValue={value => {
              if (dropdownItems === countryArea.area1) {
                console.log('~countryArea.area1~', value);
                setDropdownItems(countryArea.area2);
                setCloseAfterSelecting(true);
              } else if (dropdownItems === countryArea.area2) {
                console.log('~countryArea.area2~', value);
                // setCloseAfterSelecting(true);
                // setDropdownItems(countryArea.area1);
              }
            }}
            onSelectItem={item => {
              console.log('!!', item);
              // !! {"label": "서울특별시", "value": "서울특별시"}
            }}
            style={{
              height: 45,
              borderRadius: 15,
              borderColor: '#eee',
            }}
            textStyle={{
              fontSize: 14,
            }}
            labelStyle={
              {
                // fontWeight: 'bold',
              }
            }
            containerStyle={{
              width: 140,
              position: 'absolute',
              top: getStatusBarHeight() + 15,
              left: 15,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOpacity: 0.3,
              shadowRadius: 3,
              shadowOffset: {height: 0, width: 0},
              elevation: 5,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#fff',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#eee',
            }}
            // categorySelectable={false}
            closeAfterSelecting={closeAfterSelecting} // 선택기 안닫음
            showTickIcon={false}
            open={open}
            value={value}
            setOpen={setOpen}
            setValue={setValue}
            // setItems={setItems}
            placeholder={countryArea.area1[0].label}
            items={dropdownItems}
            // defaultValue={'서울특별시'}
            // multiple={true}
            // itemStyle={{
            //   justifyContent: 'flex-start',
            //   backgroundColor: 'pink',
            // }}
            // dropDownMaxHeight={200}
            // labelStyle={{fontSize: 14, textAlign: 'left', color: '#000'}}
          />

          <DropDownPicker
            // disabled={true}
            onChangeValue={value => {
              if (dropdownItems === countryArea.area1) {
                console.log('~countryArea.area1~', value);
                setDropdownItems(countryArea.area2);
                setCloseAfterSelecting(true);
              } else if (dropdownItems === countryArea.area2) {
                console.log('~countryArea.area2~', value);
                // setCloseAfterSelecting(true);
                // setDropdownItems(countryArea.area1);
              }
            }}
            onSelectItem={item => {
              console.log('!!', item);
              // !! {"label": "서울특별시", "value": "서울특별시"}
            }}
            style={{
              height: 45,
              borderRadius: 15,
              borderColor: '#eee',
            }}
            textStyle={{
              fontSize: 14,
            }}
            labelStyle={
              {
                // fontWeight: 'bold',
              }
            }
            containerStyle={{
              width: 140,
              position: 'absolute',
              top: getStatusBarHeight() + 15,
              right: 15,
              elevation: 5,
              shadowColor: 'rgb(50, 50, 50)',
              shadowOpacity: 0.3,
              shadowRadius: 3,
              shadowOffset: {height: 0, width: 0},
            }}
            dropDownContainerStyle={{
              backgroundColor: '#fff',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#eee',
            }}
            // categorySelectable={false}
            closeAfterSelecting={closeAfterSelecting} // 선택기 안닫음
            showTickIcon={false}
            open={open}
            value={value}
            setOpen={setOpen}
            setValue={setValue}
            // setItems={setItems}
            placeholder={countryArea.area1[0].label}
            items={dropdownItems}
            // defaultValue={'서울특별시'}
            // multiple={true}
            // itemStyle={{
            //   justifyContent: 'flex-start',
            //   backgroundColor: 'pink',
            // }}
            // dropDownMaxHeight={200}
            // labelStyle={{fontSize: 14, textAlign: 'left', color: '#000'}}
          />
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
    width: 120,
    height: dropDownHeight,
    marginLeft: 15,
    marginTop: getStatusBarHeight() + 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: 'rgb(50, 50, 50)',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {height: 0, width: 0},
    elevation: 5,
  },
  dropDownText: {
    width: 120,
    height: dropDownHeight,
    paddingTop: (dropDownHeight - dropDownFontSize) / 2,
    marginLeft: 15,
    marginTop: -dropDownHeight,
    fontSize: dropDownFontSize,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

// MapView
// ├── Nav
// │   ├── 지역 dropBox
// │   └── 스토어 dropBox
// │
// ├── Marker
// │   └── 스토어 정보 popup
// │
// └── My Location
