import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { ChallengeDetailDto } from '../dtos/challengeDtos';

const getFaceChallengeResult = async (challengeId: string) => {
  const { data } = await authorizedApi.get(
    `${API.CHALLENGE.FACE_RESULT}?challengeId=${challengeId}`,
  );
  return {
    challengeInfo: new ChallengeDetailDto(data?.data),
    answerList: data.data.familyPhotos,
  } as { challengeInfo: ChallengeDetailDto; answerList: string[] };
};

export const useGetFaceChallengeResult = ({
  challengeId,
}: {
  challengeId: string | undefined;
}) => {
  return useQuery({
    queryKey: [API.CHALLENGE.FACE_RESULT, challengeId],
    queryFn: () => getFaceChallengeResult(challengeId || ''),
  });
};
