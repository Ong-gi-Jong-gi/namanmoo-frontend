import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';

const postNormalChallenge = async (challengeId: string, answer: string) => {
  const { data } = await api.post(API.CHALLENGE.NORMAL, {
    challengeId,
    answer,
  });
  return data;
};

export const usePostNormalChallenge = ({
  challengeId,
  answer,
}: {
  challengeId: string;
  answer: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.CHALLENGE.NORMAL, challengeId, answer],
    mutationFn: () => postNormalChallenge(challengeId, answer),
    onMutate: () => ({ challengeId, answer }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.NORMAL, challengeId],
      }),
  });
};
