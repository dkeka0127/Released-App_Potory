// React & Package
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// icons
import PlusIcons from 'react-native-vector-icons/Entypo';

function BottomButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AddPhotoScreen')}
      style={styles.container}>
      <PlusIcons name="plus" size={25} color="#333" />
    </TouchableOpacity>
  );
}

export default BottomButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    // 그림자
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
});
