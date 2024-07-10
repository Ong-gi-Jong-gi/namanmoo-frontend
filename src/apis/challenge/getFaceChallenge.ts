import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { ChallengeDetailDto } from '../dtos/challengeDtos';

const getFaceChallenge = async (challengeId: string) => {
  const { data } = await authorizedApi.get(
    `${API.CHALLENGE.FACE}?challengeId=${challengeId}`,
  );

  console.log(data);

  return {
    challengeInfo: new ChallengeDetailDto(data?.data),
    code: data?.data?.code,
  };
};

export const useGetFaceChallenge = ({
  challengeId,
}: {
  challengeId: string;
}) => {
  return useQuery({
    queryKey: [API.CHALLENGE.FACE],
    queryFn: () => getFaceChallenge(challengeId),
  });
};
