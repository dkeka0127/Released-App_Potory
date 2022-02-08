import React, {useState, useEffect} from 'react';
import {View, Text, Platform, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MyLocationImg from 'react-native-vector-icons/Ionicons';

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

function MainHome() {
  const [location, setLocation] = useState<ILocation | undefined>({
    latitude: 0,
    longitude: 0,
  });
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

  console.log('사용자의 현재 위치 : ');
  console.log('Latitude : ', location.latitude);
  console.log('longitude : ', location.longitude);

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
              // latitudeDelta: 5,
              // longitudeDelta: 5,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {/* 유저 위치 */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}>
              <MyLocationImg name="location" size={30} color="tomato" />
            </Marker>

            {/* 기록장소 위치 */}
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
        </>
      ) : (
        <Text>로케이션 못받음</Text>
      )}
      {/* <MapView
        style={{flex: 1}}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </>
  );
}

export default MainHome;

// Draggable Markers
// <MapView initialRegion={...}>
//   <Marker draggable
//     coordinate={this.state.x}
//     onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
//   />
// </MapView>
