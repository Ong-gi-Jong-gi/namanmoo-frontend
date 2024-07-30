import { useSuspenseQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { LuckyDto } from '../dtos/luckyDtos';

const getLucky = async () => {
  try {
    const { data } = await authorizedApi.get(API.LUCKY.STATUS);

    if (data.data === null)
      return { luckyStatus: 0, isBubble: false } as LuckyDto;
    return new LuckyDto(data.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { luckyStatus: 0, isBubble: false } as LuckyDto;
    }
    throw error; // 다른 에러는 그대로 throw
  }
};

export const useGetLucky = () => {
  return useSuspenseQuery({
    queryKey: [API.LUCKY.STATUS],
    queryFn: () => getLucky(),
  });
};
