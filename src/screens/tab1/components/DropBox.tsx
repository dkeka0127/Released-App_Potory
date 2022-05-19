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
  const BoxComponent = (dropBoxText: string, idx?: number) => {
    console.log(idx);
    return (
      <TouchableOpacity
        key={idx}
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
      <View>
        {dataList.map((item, idx) => {
          return BoxComponent(item, idx);
        })}
      </View>
    </View>
  );
};

export default DropBox;

const styles = StyleSheet.create({
  vocaSetting: {
    width: 116,
    padding: 10,
    paddingTop: 15,
    marginTop: 50,
    marginLeft: 20,

    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#d2d2d2',

    // set fixed position
    // position: 'absolute',
    // top: 60,
    // left: 20,
    backgroundColor: '#fff',

    // 그림자
    elevation: 3,
    shadowOpacity: 0.2,
    shadowColor: '#222222',
    shadowOffset: {width: 0, height: 5},

    zIndex: 1,
  },
  dropBox: {
    padding: 5,
    marginBottom: 10,
    zIndex: 999,
  },
});
