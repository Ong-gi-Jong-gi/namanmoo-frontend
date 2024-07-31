import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postCreateChallenge = async () => {
  const { data } = await authorizedApi.post(API.CHALLENGE.CREATE);

  return data;
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.CHALLENGE.CREATE],
    mutationFn: () => postCreateChallenge(),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.TODAY],
      });
      queryClient.invalidateQueries({
        queryKey: [API.LUCKY.STATUS],
      });
    },
  });
};
