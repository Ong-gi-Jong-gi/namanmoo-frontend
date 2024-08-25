import { api } from '..';
import API from '../../constants/API';

export const tokenRefresh = async () => {
  const { headers } = await api({
    method: 'post',
    url: API.AUTH.REFRESH,
    withCredentials: true, // 쿠키를 포함시키기 위해 필요
  });

  const authorization = headers['authorization'];

  if (authorization) {
    localStorage.setItem('accessKey', authorization);
  } else {
    throw new Error('Failed to refresh token: no authorization header found.');
  }
};
