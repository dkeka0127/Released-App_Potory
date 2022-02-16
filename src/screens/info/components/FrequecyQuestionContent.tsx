import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

function FrequecyQuestionContent() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>2022.05.30 이후 업데이트 예정입니다.</Text>
    </View>
  );
}

export default FrequecyQuestionContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
  },
  text: {
    fontSize: 16,
  },
});
