import { useSuspenseQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const getFaceChallengeResult = async (challengeId: string) => {
  const { data } = await authorizedApi.get(
    `${API.CHALLENGE.FACE_RESULT}?challengeId=${challengeId}`,
  );
  const answerList = Object.keys(data?.data).map((key) => {
    return data?.data[key][0] as string;
  });

  return {
    answerList: answerList,
  } as { answerList: string[] };
};

export const useGetFaceChallengeResult = ({
  challengeId,
}: {
  challengeId: string | undefined;
}) => {
  return useSuspenseQuery({
    queryKey: [API.CHALLENGE.FACE_RESULT, challengeId],
    queryFn: () => getFaceChallengeResult(challengeId || ''),
  });
};
