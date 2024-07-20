import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postCreateChallenge = async (challengeDate: number) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.CREATE, {
    challengeDate,
  });

  return data;
};

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  const storageDate = localStorage.getItem('challengeDate');

  const challengeDate = storageDate
    ? parseInt(storageDate)
    : new Date().getTime();

  return useMutation({
    mutationKey: [API.CHALLENGE.CREATE, challengeDate],
    mutationFn: () => postCreateChallenge(challengeDate),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.TODAY],
      }),
  });
};
