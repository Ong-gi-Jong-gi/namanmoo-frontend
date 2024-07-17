import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { UserInfoDto } from '../dtos/userDtos';

const getUserInfo = async () => {
  const { data } = await authorizedApi.get(`${API.USER}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return { userInfo: new UserInfoDto(data.data) } as { userInfo: UserInfoDto };
};

export const useGetUserInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: [API.USER],
    queryFn: () => getUserInfo(),
  });

  return { ...data, isLoading };
};
