// React & Package
import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import ServiceTOSContext from '../components/ServiceTOSContent';

function ServiceTOS() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/*--------- Header ---------*/}
      <CustomHeader
        headerTitle={'서비스 이용약관'}
        goBackArrow={true}
        navigation={navigation}
      />

      {/*--------- Content ---------*/}
      <ServiceTOSContext />
    </SafeAreaView>
  );
}

export default ServiceTOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
