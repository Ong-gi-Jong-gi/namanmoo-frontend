import { useQuery } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';
import { ChallengeAnswer } from '../../types/challenge';
import { separateMyAnswer } from '../../utils/separator';
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
  challengeId: challengeId,
}: {
  challengeId: string | undefined;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.CHALLENGE.NORMAL, challengeId],
    queryFn: () => getNormalChallenge(challengeId || ''),
  });

  const hasData = !!data;
  const { myAnswer, members } = hasData
    ? separateMyAnswer(data.answerList)
    : { myAnswer: null, members: [] };

  return {
    isLoading,
    hasData,
    myAnswer,
    answerList: members,
    challengeInfo: data?.challengeInfo,
  };
};
