import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function FrequecyQuestion() {
  return (
    <View style={styles.container}>
      <Text>자주 묻는 질문</Text>
    </View>
  );
}

export default FrequecyQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
