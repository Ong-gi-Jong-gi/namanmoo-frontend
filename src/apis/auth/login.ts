import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '..';
import API from '../../constants/API';
import routes from '../../constants/routes';
import { LoginValues } from '../../types/auth';

const postLogin = async (loginId: string, password: string) => {
  const { data } = await api.post(API.AUTH.LOGIN, {
    loginId,
    password,
  });
  return data.data;
};

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [API.AUTH.LOGIN],
    mutationFn: ({ userId, password }: LoginValues) =>
      postLogin(userId, password),
    onSuccess: () => navigate(routes.main),
  });
};
