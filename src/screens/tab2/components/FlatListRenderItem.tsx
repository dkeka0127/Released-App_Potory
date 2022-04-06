import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  item: any;
};

const FlatListRenderItem = ({item}: Props) => {
  console.log(item.title);
  return (
    <View
      style={{
        width: '100%',
        height: 100,
        marginBottom: 10,
        backgroundColor: '#fff',
      }}>
      <Text>FlatListRenderItem</Text>
      <Text>{item.title}</Text>
    </View>
  );
};

export default FlatListRenderItem;

const styles = StyleSheet.create({});
