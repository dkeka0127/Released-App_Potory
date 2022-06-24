/* React & Package */
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/* custom components */
import CustomHeader from '../../../components/header/CustomHeader';
import NoticeContent from '../components/NoticeContent';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

function Notice() {
  const navigation = useNavigation();

  const goBackF = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*--------- Header ---------*/}
      <CustomHeader headerTitle={'공지사항'} />

      {/*--------- Content ---------*/}
      <NoticeContent />

      {/*--------- Footer ---------*/}
      <CustomFooterButton title="확인" action={goBackF} />
    </SafeAreaView>
  );
}

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
