import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postNormalChallenge = async (
  challengeId: string,
  answerContent: string,
) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.NORMAL, {
    challengeId,
    answerContent,
  });

  return data;
};

export const usePostNormalChallenge = ({
  challengeId,
}: {
  challengeId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.CHALLENGE.NORMAL, challengeId],
    mutationFn: ({ answerContent }: { answerContent: string }) =>
      postNormalChallenge(challengeId, answerContent),
    onMutate: (variables) => ({ challengeId, ...variables }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.NORMAL, challengeId],
      }),
  });
};
