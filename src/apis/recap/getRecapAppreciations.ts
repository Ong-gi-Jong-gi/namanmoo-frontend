import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { RecapMigos } from '../../types/recap';
import { RecapMigosDTO } from '../dtos/recapDtos';

const getRecapMigos = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.MIGOS}/?luckyId=${luckyId}`,
  );

  return {
    migos: data.data.map((migo: RecapMigos) => new RecapMigosDTO(migo)),
  } as {
    migos: RecapMigosDTO[];
  };
};

export const useGetRecapMigos = ({ luckyId }: { luckyId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.RECAP.MIGOS, luckyId],
    queryFn: () => getRecapMigos(luckyId),
  });

  const hasData = !!data;

  const migos = hasData ? data.migos : [];

  return {
    isLoading,
    hasData,
    migos,
  };
};
