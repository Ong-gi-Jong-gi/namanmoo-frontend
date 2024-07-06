import { useQuery } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';
import { ChallengeAnswer } from '../../types/challenge';
import { ChallengeAnswerDto, ChallengeDetailDto } from '../dtos/challengeDtos';

const getNormalChallenge = async (challengeId: string) => {
  const { data } = await api.get(
    `${API.CHALLENGE.NORMAL}?challengeId=${challengeId}`,
  );

  return {
    challengeInfo: new ChallengeDetailDto(data?.data),
    answerList: data.data.answerList.map(
      (answer: ChallengeAnswer) => new ChallengeAnswerDto(answer),
    ),
  } as { challengeInfo: ChallengeDetailDto; answerList: ChallengeAnswerDto[] };
};

export const useGetNormalChallenge = ({
  challengeId,
}: {
  challengeId: string;
}) => {
  return useQuery({
    queryKey: [API.CHALLENGE.NORMAL, challengeId],
    queryFn: () => getNormalChallenge(challengeId),
  });
};
