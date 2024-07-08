import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';

const postGroupChallenge = async (challengeId: string, answer: string) => {
  const { data } = await api.post(API.CHALLENGE.GROUP, {
    challengeId,
    answer,
  });

  return data;
};

export const usePostGroupChallenge = ({
  challengeId,
}: {
  challengeId: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.CHALLENGE.GROUP, challengeId],
    mutationFn: ({ answer }: { answer: string }) =>
      postGroupChallenge(challengeId, answer),
    onMutate: (variables) => ({ challengeId, ...variables }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.GROUP, challengeId],
      }),
  });
};
