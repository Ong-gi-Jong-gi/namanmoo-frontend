import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { RecapStatistics } from '../../types/recap';
import { RecapStatisticsDTO } from '../dtos/recapDtos';

const getRecapStatics = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.STATISTICS}?luckyId=${luckyId}`,
  );

  return {
    topics: data.data.map(
      (topic: RecapStatistics) => new RecapStatisticsDTO(topic),
    ),
  } as { topics: RecapStatisticsDTO[] };
};

export const useGetRecapStatistics = ({ luckyId }: { luckyId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.RECAP.STATISTICS, luckyId],
    queryFn: () => getRecapStatics(luckyId),
  });

  const hasData = !!data;

  const topics = hasData ? data.topics : ([] as RecapStatisticsDTO[]);

  return {
    hasData,
    topics,
    isLoading,
  };
};
