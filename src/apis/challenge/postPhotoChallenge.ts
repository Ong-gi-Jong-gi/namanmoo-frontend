import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postPhotoCallenge = async (challengeId: string, answer: File) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.PHOTO, {
    challengeId,
    answer,
  });

  return data;
};

export const usePostPhotoChallenge = ({
  challengeId,
  answer,
}: {
  challengeId: string;
  answer: File;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.CHALLENGE.PHOTO, challengeId],
    mutationFn: () => postPhotoCallenge(challengeId, answer),
    onMutate: () => ({ challengeId, answer }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.PHOTO, challengeId],
      }),
  });
};
