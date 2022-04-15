// React & Package
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  item: any;
};

const FlatListRenderItem = ({item}: Props) => {
  console.log(item.title);
  return (
    <View style={styles.container}>
      <Text>FlatListRenderItem</Text>
      <Text>{item.title}</Text>
    </View>
  );
};

export default FlatListRenderItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    marginTop: 30,
    marginBottom: 10,
  },
});
