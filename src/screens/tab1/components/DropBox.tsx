/* React & packages */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  dataList: any;
  getSelectData: Function;
}

const DropBox = ({dataList, getSelectData}: Props) => {
  // component
  const BoxComponent = (dropBoxText: any) => {
    return (
      <TouchableOpacity
        style={styles.dropBox}
        onPress={() => {
          getSelectData(dropBoxText);
          console.log('Clicked value', dropBoxText);
        }}>
        <Text>{dropBoxText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.vocaSetting}>
      {/* {dataList.map((item, index) => {
        console.log('BoxComponent', index, ' == ', item);
        <View></View>;
        // return <BoxComponent text={item} />;
      })} */}
      {BoxComponent('1')}
      {BoxComponent('2')}
      {BoxComponent('3')}
      {BoxComponent('4')}
      {BoxComponent('5')}
      {BoxComponent('6')}
    </View>
  );
};

export default DropBox;

const styles = StyleSheet.create({
  vocaSetting: {
    width: 116,
    height: 144,
    padding: 10,

    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#d2d2d2',

    // set fixed position
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#fff',

    // 그림자
    elevation: 3,
    shadowOpacity: 0.2,
    shadowColor: '#222222',
    shadowOffset: {width: 0, height: 5},

    zIndex: 999,
  },
  dropBox: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});
