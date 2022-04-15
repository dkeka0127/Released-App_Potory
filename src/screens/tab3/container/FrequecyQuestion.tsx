// React & Package
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// custom components
import CustomHeader from '../../common/CustomHeader';
import FrequecyQuestionContent from '../components/FrequecyQuestionContent';
import CustomFooterButton from '../../common/CustomFooterButton';

function FrequecyQuestion() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/*-------- Header --------*/}
      <CustomHeader headerTitle={'자주 묻는 질문'} />

      {/*-------- Content --------*/}
      <FrequecyQuestionContent />

      {/*-------- Footer --------*/}
      <CustomFooterButton navigation={navigation} />
    </SafeAreaView>
  );
}

export default FrequecyQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
