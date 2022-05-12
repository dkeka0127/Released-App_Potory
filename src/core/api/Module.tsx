import axios from 'axios';
import {DeviceEventEmitter} from 'react-native';

export const axiosConfig = {
  baseURL: 'http://bdg407.synology.me:12162',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'x-access-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoicGhvdG9seSJ9.zcAbn0TXYrHMu4DSTrd7MIuuulrcCBN22_N1jGidLbY',
  },
  // timeout: 3000,
};

export const axiosConfigNoneToken = {
  baseURL: 'http://bdg407.synology.me:12162',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
  // timeout: 3000,
};

// ************************* 디바이스 *************************

export async function api_registDevice(deviceID: string) {
  const response = await axios.post(
    '/user',
    {
      device_id: deviceID,
    },
    axiosConfig,
  );

  return response;
}

export const api_checkDeviceExist = async (userIdx: number) => {
  const response = await axios.get(`/user/${userIdx}`, axiosConfig);
  return response;
};

export async function api_editDevice(
  userIdx: number,
  userName?: string,
  profileImg?: any,
) {
  const response = await axios.post(
    `/user/${userIdx}`,
    {
      nick_name: userName !== undefined && userName,
      profile_image: profileImg !== undefined && profileImg,
    },
    axiosConfig,
  );

  return response;
}

export async function api_deleteDevice(userIdx: number) {
  const response = await axios.delete(
    `${axiosConfig.baseURL}/user/${userIdx}`,
    {
      headers: axiosConfig.headers,
    },
  );

  return response;
}
// ************************** 사진 **************************

export async function api_getPhotoList(userIdx: number) {
  const response = await axios.get(`/photos/${userIdx}`, axiosConfig);

  return response;
}

export async function api_registPhoto(
  userIdx: number,
  date: string,
  memo: string,
  type: string,
  image: string,
) {
  DeviceEventEmitter.emit('photoIsChanged');

  const response = await axios.post(
    '/photo',
    {
      user_idx: userIdx,
      date: date,
      memo: memo,
      type: type,
      image: image,
    },
    axiosConfig,
  );

  return response;
}

export async function api_registPhotoByQR(userIdx: number, photoURL: string) {
  DeviceEventEmitter.emit('photoIsChanged');

  const response = await axios.post(
    '/qr_photo',
    {
      photo_url: photoURL,
      user_idx: userIdx,
    },
    axiosConfig,
  );

  return response;
}

export async function api_editPhoto(
  photoNum: number,
  date: string,
  memo: string,
  userIdx: number,
) {
  DeviceEventEmitter.emit('photoIsChanged');

  const response = await axios.patch(
    `/photo/${photoNum}`,
    {
      date: date,
      memo: memo,
      user_idx: userIdx,
    },
    axiosConfig,
  );

  return response;
}

export async function api_deletePhoto(photoNum: number | any, userIdx: number) {
  DeviceEventEmitter.emit('photoIsChanged');

  const response = await axios.delete(
    `${axiosConfig.baseURL}/photo/${photoNum}`,
    {
      data: {user_idx: userIdx},
      headers: axiosConfig.headers,
    },
  );

  return response;
}

// ************************ 마이페이지 ************************

export async function api_detailNotice(noticeNum: number) {
  const response = await axios.get(`/notice/${noticeNum}`, axiosConfig);

  return response;
}

export async function api_noticeList() {
  const response = await axios.get('/notice', axiosConfig);

  return response;
}

// ************************** 스토어 **************************

export async function api_storeList() {
  const response = await axios.get('/store', axiosConfig);

  return response;
}

/////////////////////////////////////////////////////////////
{
  /*
import axios from 'axios';

export const axiosConfig = {
  // baseURL: '',
  baseURL: 'http://bdg407.synology.me:12162',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    // memberIdx: 0,
    // deviceId: '',
  },
  // timeout: 30000,
};

// 기기 등록
// export function registDevice(deviceID: string) {
//   const response = axios
//     .post(
//       '/user',
//       {
//         device_id: deviceID,
//       },
//       axiosConfig,
//     )
//     .then(response => {
//       console.log('response == ', response);
//     })
//     .catch(err => {
//       console.log('err == ', err);
//     });

//   return response;
// }

// ------------------ 기기 확인 ------------------
export const api_checkDeviceExist = (user: number) => {
  console.log('???????');
  const response = axios.get(`/user/${user}`, axiosConfig);

  return response;
};

// ------------------ 사진 등록 ------------------
export const api_registPhoto = (
  userIdx: any,
  date: any,
  memo: any,
  image: any,
) => {
  const response = axios.post(
    '/photo',
    {
      user_idx: userIdx,
      date: date,
      memo: memo,
      image: image,
    },
    axiosConfig,
  );

  return response;
};

// 사진 수정 (?)
// export function EditPhoto() {
//   const response = axios
//     .get('/user/8', axiosConfig)
//     .then(response => {
//       console.log('response == ', response);
//     })
//     .catch(err => {
//       console.log('err == ', err);
//     });

//   return response;
// }

// 사진 삭제
// export function deletePhoto(deleteNum: number) {
//   const response = axios
//     .delete(`/photos/${deleteNum}`, axiosConfig)
//     .then(response => {
//       console.log('response == ', response);
//     })
//     .catch(err => {
//       console.log('err == ', err);
//     });

//   return response;
// }

// 사진 리스트
// export function photoList(photoNum: number) {
//   const response = axios
//     .get(`/photos/${photoNum}`, axiosConfig)
//     .then(response => {
//       console.log('response == ', response);
//     })
//     .catch(err => {
//       console.log('err == ', err);
//     });

//   return response;
// }
*/
}
