import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '..';
import API from '../../constants/API';
import routes from '../../constants/routes';
import { SignupValues } from '../../types/auth';

const postSignup = async (
  loginId: string,
  password: string,
  name: string,
  nickname: string,
) => {
  const { data } = await api.post(API.AUTH.SIGNUP, {
    loginId,
    password,
    name,
    nickname,
  });
  return data;
};

export const usePostSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [API.AUTH.SIGNUP],
    mutationFn: ({
      userId,
      password,
      name,
      nickname,
    }: Omit<SignupValues, 'passwordConfirm'>) =>
      postSignup(userId, password, name, nickname),
    onSuccess: () => navigate(routes.login),
  });
};
