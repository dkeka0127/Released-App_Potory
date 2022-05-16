import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// userIdx hook
export const getAsyncStorage_userIdx = async () => {
  const [userIdx, setUserIdx] = useState();

  await AsyncStorage.getItem('userInfo', (err, result) => {
    result !== null && setUserIdx(JSON.parse(result).userNumber);
  });

  return userIdx;
};
