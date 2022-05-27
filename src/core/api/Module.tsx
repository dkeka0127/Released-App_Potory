import axios from 'axios';

export const axiosConfig = {
  baseURL: 'http://bdg407.synology.me:12162',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'x-access-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoicGhvdG9seSJ9.zcAbn0TXYrHMu4DSTrd7MIuuulrcCBN22_N1jGidLbY',
  },
  timeout: 10000,
};

export const axiosConfigPhoto = {
  baseURL: 'http://bdg407.synology.me:12162',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'x-access-token':
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoicGhvdG9seSJ9.zcAbn0TXYrHMu4DSTrd7MIuuulrcCBN22_N1jGidLbY',
  },
  // timeout: 3000,
};

// ***************************************** 디바이스 *****************************************

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
    axiosConfigPhoto,
  );
  return response;
}

export async function api_editDevice_name(userIdx: number, userName: string) {
  const response = await axios.post(
    `/user/${userIdx}`,
    {
      nick_name: userName !== undefined && userName,
    },
    axiosConfig,
  );
  return response;
}

export async function api_editDevice_profile(userIdx: number, formdata: any) {
  const response = await axios.post(
    `${axiosConfigPhoto.baseURL}/user/${userIdx}`,
    formdata,
    {
      headers: axiosConfigPhoto.headers,
      transformRequest: formData => formData,
    },
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

// ******************************************** 사진 ********************************************

export async function api_getPhotoList(userIdx: number) {
  const response = await axios.get(`/photos/${userIdx}`, axiosConfig);
  return response;
}

export async function api_registPhoto(formdata: any) {
  const response = await axios.post(
    `${axiosConfigPhoto.baseURL}/photo`,
    formdata,
    {
      headers: axiosConfigPhoto.headers,
      transformRequest: formData => formData,
    },
  );
  return response;
}

export async function api_registPhotoByQR(userIdx: number, photoURL: string) {
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
  const response = await axios.delete(
    `${axiosConfig.baseURL}/photo/${photoNum}`,
    {
      data: {user_idx: userIdx},
      headers: axiosConfig.headers,
    },
  );
  return response;
}

// **************************************** 마이페이지 ****************************************

export async function api_detailNotice(noticeNum: number) {
  const response = await axios.get(`/notice/${noticeNum}`, axiosConfig);
  return response;
}

export async function api_noticeList() {
  const response = await axios.get('/notice', axiosConfig);
  return response;
}

// ****************************************** 스토어 ******************************************

export async function api_storeList() {
  const response = await axios.get('/map/category', axiosConfig);
  return response;
}

export async function api_localKakao_storeList(
  x: number,
  y: number,
  storeName: string,
) {
  const response = await axios.get(
    `https://dapi.kakao.com/v2/local/search/keyword.json?y=${x}&x=${y}&radius=20000&query=${storeName}&size=10&sort=distance`,
    {
      headers: {
        Authorization: 'KakaoAK d5060c5e465b9767dfc59ff7924c961c',
      },
    },
  );

  return response;
}
