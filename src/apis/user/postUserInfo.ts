import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';

const postUserInfo = async (
  userId: string,
  nickname: string,
  name: string,
  userImg: string,
) => {
  const { data } = await api.post(API.USER, {
    userId,
    nickname,
    name,
    userImg,
  });

  return data;
};

export const usePostUserInfo = ({
  userId,
  nickname,
  name,
  userImg,
}: {
  userId: string;
  nickname: string;
  name: string;
  userImg: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.USER],
    mutationFn: () => postUserInfo(userId, nickname, name, userImg),
    onMutate: () => ({ userId, nickname, name, userImg }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.USER],
      }),
  });
};
