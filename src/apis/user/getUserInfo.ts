import { useQuery } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';
import { UserInfoDto } from '../dtos/userDtos';

const getUserInfo = async () => {
  const { data } = await api.get(`${API.USER}`);

  return { userInfo: new UserInfoDto(data) } as { userInfo: UserInfoDto };
};

export const useGetUserInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: [API.USER],
    queryFn: () => getUserInfo(),
  });

  return { ...data, isLoading };
};
