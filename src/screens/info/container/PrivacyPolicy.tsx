import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Page
import CustomHeader from '../../common/CustomHeader';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent';

function PrivacyPolicy() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomHeader
        headerTitle={'개인정보 처리방침'}
        goBackArrow={true}
        navigation={navigation}
      />
      {/* Content */}
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
