/* React & Package */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

/* icons */
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  headerTitle: string;
  goBackArrow?: boolean;
}

function CustomHeader({headerTitle, goBackArrow}: Props) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {goBackArrow ? (
        <TouchableOpacity
          hitSlop={styles.hitslop}
          style={styles.content}
          onPress={goBack}>
          <AntDesign name="left" size={20} color="#111" />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerText}>{headerTitle}</Text>
    </View>
  );
}

export default CustomHeader;

const styles = StyleSheet.create({
  hitslop: {
    top: 10,
    left: 15,
    bottom: 10,
    right: 50,
  },
  container: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    color: '#111',
    fontSize: 17,
    fontWeight: '500',
  },
});
