// React & Package
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import NoticeContent from '../components/NoticeContent';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

function Notice() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/*--------- Header ---------*/}
      <CustomHeader headerTitle={'공지사항'} />

      {/*--------- Content ---------*/}
      <NoticeContent />

      {/*--------- Footer ---------*/}
      <CustomFooterButton navigation={navigation} />
    </SafeAreaView>
  );
}

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
