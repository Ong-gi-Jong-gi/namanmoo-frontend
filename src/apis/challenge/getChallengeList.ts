import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { ChallengeListUnitType } from '../../types/challenge';
import { nextDate } from '../../utils/nextDate';
import { ChallengeListUnitDto } from '../dtos/challengeDtos';

const getChallengeList = async (challengeDate: number) => {
  const { data } = await authorizedApi.get(
    `${API.CHALLENGE.LIST}?challengeDate=${challengeDate}`,
  );

  return {
    challenges: data.data.map(
      (challenge: ChallengeListUnitType) => new ChallengeListUnitDto(challenge),
    ),
  } as {
    challenges: ChallengeListUnitDto[];
  };
};

export const useGetChallengeList = ({ date }: { date: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.CHALLENGE.LIST, date],
    queryFn: () => getChallengeList(date),
    staleTime: nextDate(),
  });

  const hasData = !!data;

  const challenges = hasData ? data.challenges : ([] as ChallengeListUnitDto[]);

  return {
    hasData,
    isLoading,
    challenges,
  };
};
