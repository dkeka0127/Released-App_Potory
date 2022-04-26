import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import Geocode from 'react-geocode';
// Page
import DropDown from './components/DropDown';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage('en');
Geocode.setRegion('es');
Geocode.enableDebug();

function MainHome() {
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  const BoxComponent = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text style={{}}>hihi</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 1}}
        showsMyLocationButton={true}
        center={{...P0, zoom: 16}}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />

        <View style={styles.vocaSetting}>
          {BoxComponent('전체보기')}
          {BoxComponent('오답 단어만')}
          {BoxComponent('정답 단어만')}
        </View>

        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          onClick={() => console.warn('onClick! p2')}
        />
        <Path
          coordinates={[P0, P1]}
          onClick={() => console.warn('onClick! path')}
          width={10}
        />
        {/* <DropDown /> */}
        {/* <NaverMapView
        onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
        <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
        <Marker
          coordinate={P1}
          pinColor="blue"
          onClick={() => console.warn('onClick! p1')}
        />
        <Marker
          coordinate={P2}
          pinColor="red"
          onClick={() => console.warn('onClick! p2')}
        />
        <Path
          coordinates={[P0, P1]}
          onClick={() => console.warn('onClick! path')}
          width={10}
        />
        <Polyline
          coordinates={[P1, P2]}
          onClick={() => console.warn('onClick! polyline')}
        />
        <Circle
          coordinate={P0}
          color={'rgba(255,0,0,0.3)'}
          radius={200}
          onClick={() => console.warn('onClick! circle')}
        />
        <Polygon
          coordinates={[P0, P1, P2]}
          color={`rgba(0, 0, 0, 0.5)`}
          onClick={() => console.warn('onClick! polygon')}
        />
      </NaverMapView> */}
      </NaverMapView>
    </View>
  );
}

export default MainHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vocaSetting: {
    width: 116,
    height: 144,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderColor: '#d2d2d2',
    borderWidth: 0.5,
    shadowColor: '#222222',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 5},
    elevation: 3,
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 999,
  },
  emptyVocaSetting: {
    position: 'absolute',
  },
});
