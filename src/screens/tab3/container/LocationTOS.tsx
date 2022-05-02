// React & Package
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import LocationTOSContent from '../components/LocationTOSContent';

function ServiceTOS() {
  return (
    <SafeAreaView style={styles.container}>
      {/*---------- Header ----------*/}
      <CustomHeader headerTitle={'위치정보 이용약관'} goBackArrow={true} />

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
