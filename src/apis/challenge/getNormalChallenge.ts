import { useSuspenseQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { ChallengeAnswer } from '../../types/challenge';
import { separateMyAnswer } from '../../utils/separator';
import { ChallengeAnswerDto, ChallengeDetailDto } from '../dtos/challengeDtos';

const getNormalChallenge = async (challengeId: string) => {
  const { data } = await authorizedApi.get(
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
  const { data } = useSuspenseQuery({
    queryKey: [API.CHALLENGE.NORMAL, challengeId],
    queryFn: () => getNormalChallenge(challengeId || ''),
  });

  const hasData = !!data;
  const { myAnswer, members } = hasData
    ? separateMyAnswer(data.answerList)
    : { myAnswer: null, members: [] };

  return {
    hasData,
    myAnswer,
    answerList: members,
    challengeInfo: data?.challengeInfo,
  };
};
