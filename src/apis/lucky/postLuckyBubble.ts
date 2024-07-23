import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postLuckyBubble = async () => {
  const challengeDate = localStorage.getItem('challengeDate');

  const { data } = await authorizedApi.post(`${API.LUCKY.BUBBLE}`, {
    challengeDate: challengeDate
      ? challengeDate
      : new Date().getTime().toString(),
  });

  return data;
};

export const usePostLuckyBubble = () => {
  const storageDate = localStorage.getItem('challengeDate');
  const challengeDate = storageDate
    ? storageDate
    : new Date().getTime().toString();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.LUCKY.BUBBLE],
    mutationFn: () => postLuckyBubble(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [API.LUCKY.STATUS, challengeDate],
      }),
  });
};
