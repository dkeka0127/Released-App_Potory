import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Awesome5Icons from 'react-native-vector-icons/FontAwesome5';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const optionColor = '#333';

interface Props {
  gridPress?: Function;
  sequencePress?: Function;
  bgColorPress?: Function;
  initToolValue?: Function;
}

function Header({
  gridPress,
  sequencePress,
  bgColorPress,
  initToolValue,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);

  // tools
  const [grid, setGrid] = useState<number>();
  const [sequence, setSequence] = useState<string>();
  const [bgColor, setBgColor] = useState<string>();

  // Get AsyncStorge
  const getAsyncStorage = () => {
    AsyncStorage.getItem('grid', (_err, value) => {
      value === null ? setGrid(2) : setGrid(Number(value));
    });
    AsyncStorage.getItem('sequence', (_err, value) => {
      value === null ? setSequence('new') : setSequence(value);
    });
    AsyncStorage.getItem('bgColor', (_err, value) => {
      value === null ? setBgColor('#ddd') : setBgColor(value);
    });
  };

  // Set AsyncStorge
  const setColorAsync = () => {
    AsyncStorage.setItem('grid', String(grid));
    AsyncStorage.setItem('sequence', sequence);
    AsyncStorage.setItem('bgColor', bgColor);
  };

  // 클릭 시 변경되는 값 저장
  const setGridF = () => {
    grid === 1 ? setGrid(2) : grid === 2 ? setGrid(3) : setGrid(1);
    gridPress(grid === 1 ? 2 : grid === 2 ? 3 : 1);
  };
  const setSequenceF = () => {
    sequence === 'new' ? setSequence('old') : setSequence('new');
    sequencePress(sequence === 'new' ? 'old' : 'new');
  };
  const setBgColorF = () => {
    bgColor === '#111' ? setBgColor('#ddd') : setBgColor('#111');
    bgColorPress(bgColor === '#111' ? '#ddd' : '#111');
  };

  useEffect(() => {
    // 초기 Async 값 불러옴
    getAsyncStorage();
  }, []);

  // 초기 Async 값 Main으로 전달
  useEffect(() => {
    if (grid !== undefined && sequence !== undefined && bgColor !== undefined) {
      initToolValue({grid, sequence, bgColor});
    }
  }, [grid, sequence, bgColor]);

  return (
    <View style={styles.container}>
      {/************************* Logo *************************/}
      <View style={styles.appName}>
        <Text style={styles.appNameFont}>
          {isEdit ? 'Potory' : 'Photo in memory'}
        </Text>
      </View>

      <View style={styles.toolCon}>
        {/************************* Tools *************************/}
        {isEdit && (
          <View style={styles.optionCon}>
            {/******** Grid ********/}
            <TouchableOpacity style={styles.options} onPress={setGridF}>
              <CommunityIcons
                name={'grid-large'}
                size={21}
                color={optionColor}
              />
            </TouchableOpacity>
            {/******** Sequence ********/}
            <TouchableOpacity
              style={styles.options}
              hitSlop={styles.hitslop}
              onPress={setSequenceF}>
              <Awesome5Icons
                name={'arrows-alt-v'}
                size={18}
                color={optionColor}
              />
            </TouchableOpacity>
            {/******** BG_Color ********/}
            <TouchableOpacity style={styles.options} onPress={setBgColorF}>
              <Ionicons
                name={'color-palette-outline'}
                size={24}
                color={optionColor}
              />
            </TouchableOpacity>
          </View>
        )}

        {/*********************** Edit & Save ***********************/}
        <TouchableOpacity
          style={styles.tool}
          hitSlop={styles.hitslop}
          onPress={() => {
            setIsEdit(!isEdit);
            isEdit && setColorAsync();
          }}>
          {isEdit ? (
            <MaterialIcons name={'save-alt'} size={20} color={'black'} />
          ) : (
            <Feather name={'tool'} size={19} color={'black'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;

const containerPadding = 20;
const toolsmarginTop = 4;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: containerPadding,
    paddingRight: containerPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appName: {
    height: '100%',
    justifyContent: 'center',
  },
  appNameFont: {
    paddingLeft: 0,
    paddingRight: 10,
    fontStyle: 'italic',
    fontSize: 17,
    fontWeight: '300',
  },
  toolCon: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tool: {
    marginTop: toolsmarginTop,
    padding: 9,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
    // 그림자
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowColor: 'rgb(50, 50, 50)',
    shadowOffset: {height: 0, width: 0},
  },
  optionCon: {
    height: '100%',
    padding: 8,
    marginRight: 3,
    flexDirection: 'row',
  },
  options: {
    padding: 6,
    paddingRight: 10,
    marginTop: toolsmarginTop,
    marginRight: 13,
    borderRadius: 15,
    justifyContent: 'center',
  },
  hitslop: {
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
  },
});
