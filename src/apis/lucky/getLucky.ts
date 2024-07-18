import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { LuckyDto } from '../dtos/luckyDtos';

const getLucky = async () => {
  const challengeDate = localStorage.getItem('challengeDate');

  const { data } = await authorizedApi.get(
    `${API.LUCKY.STATUS}?challengeDate=${challengeDate ? challengeDate : new Date().getTime().toString()}`,
  );

  return new LuckyDto(data.data);
};

export const useGetLucky = () => {
  const { data, isLoading } = useQuery({
    queryKey: [API.LUCKY.STATUS],
    queryFn: () => getLucky(),
  });

  const hasData = !!data;

  const luckyInfo = hasData
    ? { ...data, luckyStatus: data.luckyStatus }
    : ({ luckyStatus: 1, isBubble: false } as LuckyDto);

  return { hasData, isLoading, luckyInfo };
};
