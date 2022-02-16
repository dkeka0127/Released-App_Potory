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
          style={{position: 'absolute', left: 15}}
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name="left" size={18} color="#111" />
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
