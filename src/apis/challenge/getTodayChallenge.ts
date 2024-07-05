import { useQuery } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';
import { responseRoot } from '../../types/api';
import { ChallengeInfo } from '../../types/challenge';
import { ChallengeInfoDto } from '../dtos/challengeDtos';

const getTodayChallenge = async () => {
  const { data } = await api.get<responseRoot<ChallengeInfo>>(
    API.CHALLENGE.TODAY,
  );

  if (data.status === '200') return new ChallengeInfoDto(data?.data);
  if (data.status === '404' && data.message === 'challenge not found') {
    return null;
  }

  throw new Error(data.message);
};
export const useGetTodayChallenge = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: [API.CHALLENGE.TODAY],
    queryFn: getTodayChallenge,
    enabled,
  });
};
