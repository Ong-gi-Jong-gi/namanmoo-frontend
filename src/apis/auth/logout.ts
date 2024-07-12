import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authorizedApi } from '..';
import API from '../../constants/API';
import routes from '../../constants/routes';
import { deleteCookie } from '../../utils/cookie';

export const postLogout = async () => {
  const { data } = await authorizedApi.post(API.AUTH.LOGOUT);

  if (data.data.status == '200') {
    deleteCookie('authorization');
  }
  return data.data;
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [API.AUTH.LOGOUT],
    mutationFn: () => postLogout(),
    onSuccess: () => {
      navigate(routes.main);
      deleteCookie('authorization');
    },
  });
};
