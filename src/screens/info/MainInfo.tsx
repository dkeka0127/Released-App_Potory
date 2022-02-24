import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollViewComponent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CoinIcon from 'react-native-vector-icons/FontAwesome5';
import SettingIcon from 'react-native-vector-icons/Ionicons';
import PictureIcon from 'react-native-vector-icons/AntDesign';

// Page
import {userinfo} from '../../../dummyData';
import Header from './components/Header';
import Content from './components/Content';
import {ScrollView} from 'react-native-gesture-handler';

// [height] User Name Section
const nameContainerHeight = 60;

function MainInfo() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Content />
    </SafeAreaView>
  );
}

export default MainInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: '#f2f2ef',
  },
});
