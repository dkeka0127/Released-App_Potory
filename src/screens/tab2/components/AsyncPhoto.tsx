// Asycn Example File

/* React & Package */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function App() {
  const [color, setColor] = useState('white');

  const setColorAsync = () => {
    AsyncStorage.setItem('color', color);
  };

  const getColorAsync = () => {
    AsyncStorage.getItem('color', (_err, value) => {
      console.log('get Color(첫 진입) == ', value);
      setColor(value);
    });
  };

  // ⓵ 화면 진입 시 저장된 storge 불러옴
  useEffect(() => {
    getColorAsync();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text>AsyncStorage{'\n'}</Text>
      <Text>color : {color}</Text>

      {/* ② 클릭마다 색 변경 - setColor */}
      <TouchableOpacity
        onPress={() => setColor(color === 'white' ? 'gray' : 'white')}>
        <Text>
          {'\n'}Change Color BTN{'\n'}
        </Text>
      </TouchableOpacity>

      {/* ③ 변경된 색 저장 - setColorAsync */}
      <TouchableOpacity onPress={setColorAsync}>
        <Text>Commit{'\n'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fee',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
