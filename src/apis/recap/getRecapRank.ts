import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { RecapDetail, RecapRanking } from '../../types/recap';
import { RecapDetailDTO, RecapRankingDTO } from '../dtos/recapDtos';

const getRecapRank = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.RANK}?luckyId=${luckyId}`,
  );

  return {
    recapDetail: new RecapDetailDTO({
      totalCount: data.totalCount,
      luckyStatus: data.luckyStatus,
    }),
    ranking: data.data.ranking.map(
      (rank: RecapRanking) => new RecapRankingDTO(rank),
    ),
  } as {
    recapDetail: RecapDetailDTO;
    ranking: RecapRankingDTO[];
  };
};

export const useGetRecapRank = ({ luckyId }: { luckyId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.RECAP.RANK, luckyId],
    queryFn: () => getRecapRank(luckyId),
  });

  const hasData = !!data;

  const recapDetail = hasData
    ? data.recapDetail
    : ({ totalCount: 0, luckyStatus: 1 } as RecapDetail);

  const ranking = hasData ? data.ranking : ([] as RecapRanking[]);

  const sortedRanking = ranking.sort((a, b) => b.count - a.count);

  return {
    hasData,
    isLoading,
    recapDetail,
    ranking: sortedRanking,
  };
};
