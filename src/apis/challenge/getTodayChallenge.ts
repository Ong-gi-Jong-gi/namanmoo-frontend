import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { responseRoot } from '../../types/api';
import { ChallengeToday } from '../../types/challenge';
import { ChallengeInfoDto } from '../dtos/challengeDtos';

const getTodayChallenge = async () => {
  const { data } = await authorizedApi.get<responseRoot<ChallengeToday>>(
    `${API.CHALLENGE.TODAY}?challengeDate=${new Date().getTime().toString()}`,
  );

  if (data.status === '200')
    return {
      challengeInfo: new ChallengeInfoDto(data.data.challengeInfo),
      isDone: data.data.isDone,
    };
  if (data.status === '404' && data.message === 'challenge not found') {
    return {
      challengeInfo: null,
      isDone: false,
    };
  }

  throw new Error(data.message);
};
export const useGetTodayChallenge = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.CHALLENGE.TODAY],
    queryFn: () => getTodayChallenge(),
    enabled,
  });

  return {
    challengeInfo: data?.challengeInfo,
    isDone: data && data.isDone,
    isLoading,
  };
};
