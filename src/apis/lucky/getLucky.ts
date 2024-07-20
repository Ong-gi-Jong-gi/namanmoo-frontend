import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { LuckyDto } from '../dtos/luckyDtos';

const getLucky = async () => {
  const challengeDate = localStorage.getItem('challengeDate');

  try {
    const { data } = await authorizedApi.get(
      `${API.LUCKY.STATUS}?challengeDate=${challengeDate ? challengeDate : new Date().getTime().toString()}`,
    );

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
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery({
    queryKey: [API.LUCKY.STATUS],
    queryFn: () => getLucky(),
  });

  if (data) {
    if (localStorage.getItem('existluckyId') != data.luckyId) {
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.STARTDATE],
      });
      localStorage.setItem('existluckyId', data.luckyId);
    }
  }

  return { data };
};
