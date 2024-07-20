import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { responseRoot } from '../../types/api';
import { ChallengeToday } from '../../types/challenge';
import { ChallengeInfoDto } from '../dtos/challengeDtos';

const getTodayChallenge = async () => {
  const challengeDate = localStorage.getItem('challengeDate');

  const { data } = await authorizedApi.get<responseRoot<ChallengeToday>>(
    `${API.CHALLENGE.TODAY}?challengeDate=${challengeDate ? challengeDate : new Date().getTime().toString()}`,
  );

  if (data.status === '200')
    return {
      challengeInfo: new ChallengeInfoDto(data.data.challengeInfo),
      isDone: data.data.isDone,
    };
  if (data.status === '404' && data.message === 'Challenge not found') {
    return {
      challengeInfo: null,
      isDone: false,
    };
  }

  throw new Error(data.message);
};
export const useGetTodayChallenge = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: [API.CHALLENGE.TODAY],
    queryFn: () => getTodayChallenge(),
    enabled,
  });
};
