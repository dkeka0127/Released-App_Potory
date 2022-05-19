import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
// import Geocode from 'react-geocode';
// Page
import DropBox from './components/DropBox';
import Dropdown from './components/DropDown';

// Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
// Geocode.setLanguage('en');
// Geocode.setRegion('es');
// Geocode.enableDebug();

const data = ['전체', '인생네컷', '포토이즘', '포토시그니처'];

function MainHome() {
  const [storeName, setStoreName] = useState(data[0]);

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  // api
  const x = 35.1638268;
  const y = 129.1314613;

  useEffect(() => {
    if (storeName === '전체') {
      setStoreName('사진관');
    }
  }, [storeName]);

  // axios
  //   .get(
  //     `https://dapi.kakao.com/v2/local/search/keyword.json?y=${y}&x=${x}&radius=20000&query=${storeName}&size=10&sort=distance`,
  //     {
  //       headers: {
  //         Authorization: 'KakaoAK d5060c5e465b9767dfc59ff7924c961c',
  //       },
  //     },
  //   )
  //   .then(res => {
  //     console.log('res ......', res.data.documents);
  //   })
  //   .catch(err => {
  //     console.log('err ......', err);
  //   });

  // function
  const getDropDownItem = (value: string) => setStoreName(value);

  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.mapContainer}
        showsMyLocationButton={true}
        center={{...P0, zoom: 16}}>
        {/* DropBox */}

        <Dropdown data={data} getDropDownItem={getDropDownItem} />

        {/* Marker */}

        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />

        {/* map으로 스토어 marker 렌더링 */}

        {/* {data.map((val, id) => {
          return (
            <Marker
              coordinate={{latitude: val.lat, longitude: val.lng}}
              pinColor="blue"
              key={id + '_' + Date.now()}
              onClick={() => {}}
            />
          );
        })} */}

        {/* Path */}

        <Path
          coordinates={[P0, P1]}
          onClick={() => console.warn('onClick! path')}
          width={5}
        />
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
