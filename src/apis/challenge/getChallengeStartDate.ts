import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const getChallengeStartDate = async () => {
  const { data } = await authorizedApi.get(API.CHALLENGE.STARTDATE);

  return {
    challengeStartDate: data.data.challengeStartDate,
  };
};

export const useGetChallengeStartDate = ({ enabled }: { enabled: boolean }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.CHALLENGE.STARTDATE],
    queryFn: () => getChallengeStartDate(),
    enabled,
  });

  const hasData = !!data;

  if (hasData) {
    localStorage.setItem('challengeDate', data.challengeStartDate);
  }

  return {
    isLoading,
  };
};
