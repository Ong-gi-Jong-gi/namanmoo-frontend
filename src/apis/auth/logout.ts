import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authorizedApi } from '..';
import API from '../../constants/API';
import routes from '../../constants/routes';
import { deleteCookie } from '../../utils/cookie';

export const postLogout = async () => {
  const response = await authorizedApi.post(API.AUTH.LOGOUT);

  if (response.status === 302 || response.headers.locat) {
    const redirectUrl = response.headers.location;
    deleteCookie('authorization');
    return { redirectUrl };
  }

  return response.data;
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [API.AUTH.LOGOUT],
    mutationFn: () => postLogout(),
    onSuccess: () => {
      deleteCookie('authorization');
      navigate(routes.login, { replace: true });
    },

    onError: (error) => {
      console.error('Logout mutation failed:', error);
    },
  });
};
