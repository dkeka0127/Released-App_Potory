// React & package
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// custom components
import CustomHeader from '../../../components/header/CustomHeader';
import FrequecyQuestionContent from '../components/FrequecyQuestionContent';
import CustomFooterButton from '../../../components/footer/CustomFooterButton';

function FrequecyQuestion() {
  const navigation = useNavigation();

  const goBackF = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*-------- Header --------*/}
      <CustomHeader headerTitle={'자주 묻는 질문'} />

      {/*-------- Content --------*/}
      <FrequecyQuestionContent />

      {/*-------- Footer --------*/}
      <CustomFooterButton title="확인" action={goBackF} />
    </SafeAreaView>
  );
}

export default FrequecyQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
