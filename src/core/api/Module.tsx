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
  // timeout: 3000,
};

// 기기 등록
export function registDevice(deviceID: string) {
  const response = axios
    .post(
      '/user',
      {
        device_id: deviceID,
      },
      axiosConfig,
    )
    .then(response => {
      console.log('response == ', response);
    })
    .catch(err => {
      console.log('err == ', err);
    });

  return response;
}

// 기기 확인
export const api_checkDeviceExist = async (user: number) => {
  const response = await axios.get(`/user/${user}`, axiosConfig);
  return response;
};

// 사진 등록
export function registPhoto(userIdx, date, memo, image) {
  const response = axios
    .post(
      '/photo',
      {
        userIdx: userIdx,
        date: date,
        memo: memo,
        image: image,
      },
      axiosConfig,
    )
    .then(response => {
      console.log('response == ', response);
    })
    .catch(err => {
      console.log('err == ', err);
    });

  return response;
}

// 사진 수정 (?)
export function EditPhoto(s) {
  const response = axios
    .get('/user/8', axiosConfig)
    .then(response => {
      console.log('response == ', response);
    })
    .catch(err => {
      console.log('err == ', err);
    });

  return response;
}

// 사진 삭제
export function deletePhoto(deleteNum: number) {
  const response = axios
    .delete(`/photos/${deleteNum}`, axiosConfig)
    .then(response => {
      console.log('response == ', response);
    })
    .catch(err => {
      console.log('err == ', err);
    });

  return response;
}

// 사진 리스트
export function photoList(photoNum: number) {
  const response = axios
    .get(`/photos/${photoNum}`, axiosConfig)
    .then(response => {
      console.log('response == ', response);
    })
    .catch(err => {
      console.log('err == ', err);
    });

  return response;
}
