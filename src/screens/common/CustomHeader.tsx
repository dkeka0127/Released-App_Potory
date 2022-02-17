import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  headerTitle: string;
  goBackArrow?: boolean;
  navigation?: any;
}

function CustomHeader({headerTitle, goBackArrow, navigation}: Props) {
  return (
    <View style={styles.headerContainer}>
      {goBackArrow ? (
        <TouchableOpacity
          hitSlop={{top: 10, left: 15, bottom: 10, right: 50}}
          style={{position: 'absolute', left: 18}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="left" size={19} color="#111" />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
}

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '500',
  },
});
