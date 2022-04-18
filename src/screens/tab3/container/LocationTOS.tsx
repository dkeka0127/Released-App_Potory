// React & Package
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import LocationTOSContent from '../components/LocationTOSContent';

function ServiceTOS() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/*---------- Header ----------*/}
      <CustomHeader
        headerTitle={'위치정보 이용약관'}
        goBackArrow={true}
        navigation={navigation}
      />

      {/*---------- Content ----------*/}
      <LocationTOSContent />
    </SafeAreaView>
  );
}

export default ServiceTOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
