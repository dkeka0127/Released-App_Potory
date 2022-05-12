import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const userNum = 14;

// userIdx hook
export const getAsyncStorage_userIdx = async () => {
  const [userIdx, setUserIdx] = useState();

  await AsyncStorage.getItem('userInfo', (err, result) => {
    setUserIdx(JSON.parse(result).userNumber);
  });

  return userIdx;
};
