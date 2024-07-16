import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { ChallengeAnswer } from '../../types/challenge';
import { separateMyAnswer } from '../../utils/separator';
import { ChallengeAnswerDto, ChallengeDetailDto } from '../dtos/challengeDtos';

const getVoiceChallenge = async (challengeId: string) => {
  const { data } = await authorizedApi.get(
    `${API.CHALLENGE.VOICE}?challengeId=${challengeId}`,
  );

  return {
    challengeInfo: new ChallengeDetailDto(data?.data),
    answerList: data.data.answerList.map(
      (answer: ChallengeAnswer) => new ChallengeAnswerDto(answer),
    ),
  } as { challengeInfo: ChallengeDetailDto; answerList: ChallengeAnswerDto[] };
};

export const useGetVoiceChallenge = ({
  challengeId: challengeId,
}: {
  challengeId: string | undefined;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.CHALLENGE.VOICE, challengeId],
    queryFn: () => getVoiceChallenge(challengeId || ''),
  });

  const hasData = !!data;
  const { myAnswer, members } = hasData
    ? separateMyAnswer(data.answerList)
    : { myAnswer: null, members: [] };
  const challengeInfo = hasData
    ? data.challengeInfo
    : ({
        challengeDate: '',
        challengeNumber: '',
        challengeTitle: '',
        isComplete: false,
      } as ChallengeDetailDto);

  return {
    isLoading,
    hasData,
    myAnswer,
    answerList: members,
    challengeInfo,
  };
};
