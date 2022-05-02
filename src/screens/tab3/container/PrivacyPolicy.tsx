// React & Package
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent';

function PrivacyPolicy() {
  return (
    <SafeAreaView style={styles.container}>
      {/*--------- Header ---------*/}
      <CustomHeader headerTitle={'개인정보 처리방침'} goBackArrow={true} />

      {/*--------- Content ---------*/}
      <PrivacyPolicyContent />
    </SafeAreaView>
  );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
