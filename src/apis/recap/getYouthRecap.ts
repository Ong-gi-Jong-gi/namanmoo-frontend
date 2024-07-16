import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { YouthRecap } from '../../types/recap';
import { YouthRecapDTO } from '../dtos/recapDtos';

const getYouthRecap = async () => {
  const { data } = await authorizedApi.get(API.RECAP.YOUTH);
  return data.data.map(
    (recap: YouthRecap) => new YouthRecapDTO(recap),
  ) as YouthRecapDTO[];
};

export const useGetYouthRecap = ({ luckyId }: { luckyId: string }) => {
  return useQuery({
    queryKey: [API.RECAP.YOUTH, luckyId],
    queryFn: getYouthRecap,
  });
};
