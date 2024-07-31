import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postLuckyBubble = async () => {
  const { data } = await authorizedApi.post(API.LUCKY.BUBBLE);

  return data;
};

export const usePostLuckyBubble = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.LUCKY.BUBBLE],
    mutationFn: () => postLuckyBubble(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [API.LUCKY.STATUS],
      }),
  });
};
