// React & Package
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function FrequecyQuestionContent() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        여러분의 소중한 의견을 모아 {'\n'} {'\n'}2022.06.27 이후 업데이트
        예정입니다.
      </Text>
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
    backgroundColor: '#fff',

    // 그림자
    elevation: 4,
    shadowRadius: 7,
    shadowOpacity: 0.15,
    shadowColor: 'rgb(158, 158, 158)',
    shadowOffset: {height: 3, width: 0},
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
