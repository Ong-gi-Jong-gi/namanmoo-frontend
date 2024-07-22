import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postGroupChallenge = async (
  challengeId: string,
  answerContent: string,
) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.GROUP, {
    challengeId,
    answerContent,
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
    mutationFn: ({ answerContent }: { answerContent: string }) =>
      postGroupChallenge(challengeId, answerContent),
    onMutate: (variables) => ({ challengeId, ...variables }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.GROUP, challengeId],
      });
    },
  });
};
