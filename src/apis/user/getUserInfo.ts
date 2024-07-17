import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { UserInfoDto } from '../dtos/userDtos';

const getUserInfo = async () => {
  const { data } = await authorizedApi.get(`${API.USER}`);

  return { userInfo: new UserInfoDto(data.data) } as { userInfo: UserInfoDto };
};

export const useGetUserInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: [API.USER],
    queryFn: () => getUserInfo(),
  });

  const hasData = !!data;

  const userInfo = hasData
    ? data.userInfo
    : ({
        userInfo: {
          userId: '',
          name: '',
          nickname: '',
          role: '아빠',
          userImg: '',
          code: '',
        },
      } as unknown as UserInfoDto);

  return { userInfo, hasData, isLoading };
};
