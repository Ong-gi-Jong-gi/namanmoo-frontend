import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '..';
import API from '../../constants/API';
import routes from '../../constants/routes';
import { LoginValues } from '../../types/auth';
import { setCookie } from '../../utils/cookie'; // 쿠키 설정 함수 import

const postLogin = async (loginId: string, password: string) => {
  try {
    const { data, headers } = await api.post(API.AUTH.LOGIN, {
      loginId,
      password,
    });

    if (data.status === '401') {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    const authorization = headers['authorization'];

    console.log('Authorization Header:', authorization);

    return { data: data?.data, authorization };
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
    throw new Error((error as AxiosError).message || '로그인에 실패했습니다.');
  }
};

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [API.AUTH.LOGIN],
    mutationFn: ({ userId, password }: LoginValues) =>
      postLogin(userId, password),
    onSuccess: ({ authorization }) => {
      const expireDate = new Date();
      expireDate.setMinutes(expireDate.getMinutes() + 5);

      setCookie('authorization', authorization, {
        path: '/',
        secure: true,
        expires: expireDate,
      });
      navigate(routes.main);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};
