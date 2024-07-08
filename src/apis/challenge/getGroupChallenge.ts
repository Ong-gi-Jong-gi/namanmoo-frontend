import { useQuery } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';
import { ChallengeAnswer } from '../../types/challenge';
import { separateMyAnswer } from '../../utils/separator';
import {
  ChallengeAnswerDto,
  ChallengeGroupAnswerDto,
  ChallengeGroupDetailDto,
} from '../dtos/challengeDtos';

const getGroupChallenge = async (challengeId: string) => {
  const { data } = await api.get(
    `${API.CHALLENGE.GROUP}?challengeId=${challengeId}`,
  );

  return {
    challengeDetail: new ChallengeGroupDetailDto(data.data),
    parentChallenge: {
      challengeTitle: data.data.parentChallenge.challengeTitle,
      answerList: data.data.parentChallenge.answerList.map(
        (answer: ChallengeAnswer) => new ChallengeAnswerDto(answer),
      ),
    },
    childrenChallenge: {
      challengeTitle: data.data.childrenChallenge.challengeTitle,
      answerList: data.data.childrenChallenge.answerList.map(
        (answer: ChallengeAnswer) => new ChallengeAnswerDto(answer),
      ),
    },
  } as {
    challengeDetail: ChallengeGroupDetailDto;
    parentChallenge: ChallengeGroupAnswerDto;
    childrenChallenge: ChallengeGroupAnswerDto;
  };
};

export const useGetGroupChallenge = ({
  challengeId,
}: {
  challengeId: string | undefined;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.CHALLENGE.GROUP, challengeId],
    queryFn: () => getGroupChallenge(challengeId || ''),
  });

  const hasData = !!data;

  const { myAnswer: childMyAnswer, members: childMembers } = hasData
    ? separateMyAnswer(data.childrenChallenge.answerList)
    : { myAnswer: null, members: [] };

  const { myAnswer: parentMyAnswer, members: parentMembers } = hasData
    ? separateMyAnswer(data.parentChallenge.answerList)
    : { myAnswer: null, members: [] };

  const amIChild = !!childMyAnswer;

  const firstAnswer = amIChild ? childMyAnswer : parentMyAnswer;
  const firstAnswerList = amIChild ? childMembers : parentMembers;
  const firstQuestions = amIChild
    ? data?.childrenChallenge.challengeTitle
    : data?.parentChallenge.challengeTitle;

  const secondAnswerList = amIChild ? parentMembers : childMembers;
  const secondQuestions = amIChild
    ? data?.parentChallenge.challengeTitle
    : data?.childrenChallenge.challengeTitle;

  return {
    challengeInfo: data?.challengeDetail,
    firstAnswer,
    firstAnswerList,
    firstQuestions,
    secondQuestions,
    secondAnswerList,
    isLoading,
    hasData,
  };
};
