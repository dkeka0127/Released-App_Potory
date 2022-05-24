/* React & packages */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import Geolocation from 'react-native-geolocation-service';

/* icons */
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* custom components */
import Dropdown from './components/DropDown';
import Toast from '../../components/Toast/Toast';

/* api */
import {api_storeList, api_localKakao_storeList} from '../../core/api/Module';

function MainHome() {
  const [x, setX] = useState<any>(37.564214);
  const [y, setY] = useState<any>(127.0016985);

  const [storeName, setStoreName] = useState('전체');
  const [storeNameList, setStoreNameList] = useState([]);
  const [storeLocationList, setStoreLocationList] = useState([]);

  const [touchDisable, setTouchDisable] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [clickedStoreInfo, setClickedStoreInfo] = useState<any>();

  // useEffect
  useEffect(() => {
    geoLocation();
    getStoreNameList();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  useEffect(() => {
    setIsPopupShown(false);
    getLocationFromKakaoAPI();
  }, [storeName, x, y]);

  // api
  const getStoreNameList = () => {
    api_storeList()
      .then(res => setStoreNameList(res.data.data))
      .catch(err => console.log('api_storeList Err', err));
  };

  const getLocationFromKakaoAPI = () => {
    const _storeName = storeName === '전체' ? '사진' : storeName;

    api_localKakao_storeList(x, y, _storeName)
      .then(res => {
        setStoreLocationList(res.data.documents);
        console.log('res.data.documents.length', res.data.documents.length);
      })
      .catch(err => console.log('api_localKakao_storeList Err == ', err));
  };

  // function
  const getDropDownItem = (value: string) => setStoreName(value);

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setX(latitude);
        setY(longitude);
      },
      error => console.log(error.code, error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const researchStore = () => {
    geoLocation();
    setTouchDisable(true);
    Toast.show(`현 위치에서 ${storeName} 이(가) 재검색 되었습니다.`);
    setTimeout(() => {
      setTouchDisable(false);
    }, 2000);
  };

  console.log(x, y, clickedStoreInfo, storeName);

  return (
    <View style={styles.container}>
      {/* DropBox */}

      <Dropdown data={storeNameList} getDropDownItem={getDropDownItem} />

      {/* ReSearch */}

      <TouchableOpacity
        disabled={touchDisable}
        style={styles.reSearchContainer}
        onPress={researchStore}>
        <CommunityIcons name={'replay'} size={23} color="#000" />
      </TouchableOpacity>

      {/* Popup */}

      {isPopupShown && (
        <View style={styles.popup}>
          <View style={styles.popupContent1}>
            <MaterialIcons name={'storefront'} size={23} color="#000" />
            <Text style={styles.popupText1}>{clickedStoreInfo.place_name}</Text>
          </View>
          <View style={styles.popupContent2}>
            <Feather name={'flag'} size={22} color="#000" />
            <Text style={styles.popupText2}>{clickedStoreInfo.distance} m</Text>
          </View>
        </View>
      )}

      {/* MapView */}

      <NaverMapView
        style={styles.mapContainer}
        showsMyLocationButton={true}
        onMapClick={() => setIsPopupShown(false)}
        center={{...{latitude: x, longitude: y}, zoom: 16}}>
        {/* Marker */}

        {storeLocationList.map((val, id) => {
          return (
            <Marker
              coordinate={{latitude: Number(val.y), longitude: Number(val.x)}}
              key={val.id}
              onClick={() => {
                setClickedStoreInfo(val);
                setIsPopupShown(true);
              }}
              width={30}
              height={42}
              image={require('../../assets/images/icons/location_pin.png')}
            />
          );
        })}
      </NaverMapView>
    </View>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 15,
  },
  reSearchContainer: {
    position: 'absolute',
    bottom: 110,
    left: 12,
    width: 47,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1000,

    // 그림자
    elevation: 3,
    shadowOpacity: 0.4,
    shadowColor: '#666',
    shadowOffset: {width: 0, height: 0},
  },
  popup: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    width: 200,
    height: 100,
    borderRadius: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1000,

    // 그림자
    elevation: 3,
    shadowOpacity: 0.6,
    shadowColor: '#888',
    shadowOffset: {width: 0, height: 0},
  },
  popupContent1: {
    padding: 13,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  popupContent2: {
    padding: 13,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  popupText1: {
    width: 145,
    marginLeft: 7,
  },
  popupText2: {
    marginLeft: 7,
  },
});

// 1.

// function fetchAndUpdatePosts() {
//   fetchPosts()
//     .then(posts => {
//       updatePosts(posts).catch(err => {
//         console.log('error in updating posts');
//       });
//     })
//     .catch(() => {
//       console.log('error in fetching posts');
//     });
// }

//

// 2.

// async function fetchAndUpdatePosts() {
//   const posts = await fetchPosts().catch(() => {
//     console.log('error in fetching posts');
//   });
//   if (posts) {
//     doSomethingWithPosts(posts);
//   }
// }
