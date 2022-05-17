import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const GameResultHeader = () => {
  // dropBox Shown : true/false
  const [isShown, setIsShown] = useState(false);

  const boxComponent = (dropBoxText: string) => {
    return (
      <TouchableOpacity
        style={styles.dropBox}
        onPress={() => {
          console.log('dropBoxText', dropBoxText);
        }}>
        <Text>{dropBoxText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsShown(!isShown)}>
        <Text>Click to Control DropBox</Text>
      </TouchableOpacity>

      {isShown ? (
        <ScrollView style={styles.vocaSetting}>
          {boxComponent('1')}
          {boxComponent('2')}
          {boxComponent('3')}
          {boxComponent('4')}
          {boxComponent('5')}
          {boxComponent('6')}
        </ScrollView>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vocaSetting: {
    width: 116,
    height: 144,
    padding: 10,

    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#d2d2d2',

    // set fixed position
    position: 'absolute',
    top: 180,
    left: 135,
    backgroundColor: '#ffffff',

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

export default GameResultHeader;
