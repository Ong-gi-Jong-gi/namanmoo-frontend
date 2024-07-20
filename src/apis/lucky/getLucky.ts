import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { LuckyDto } from '../dtos/luckyDtos';

const getLucky = async () => {
  const challengeDate = localStorage.getItem('challengeDate');

  const { data } = await authorizedApi.get(
    `${API.LUCKY.STATUS}?challengeDate=${challengeDate ? challengeDate : new Date().getTime().toString()}`,
  );

  if (data.data === null) return { luckyStatus: 0, isBubble: false } as LuckyDto;
  return new LuckyDto(data.data);
};

export const useGetLucky = ({enabled}: {enabled:boolean}) => {
  return useQuery({
    queryKey: [API.LUCKY.STATUS],
    queryFn: () => getLucky(),
    enabled,
  });
};
