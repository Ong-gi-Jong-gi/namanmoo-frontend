import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { RecapAppreciationsType } from '../../types/recap';
import { RecapAppreciationsDTO } from '../dtos/recapDtos';

const getRecapAppreciations = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.APPRECIATIONS}?luckyId=${luckyId}`,
  );

  return {
    appreciations: data.data.map(
      (migo: RecapAppreciationsType) => new RecapAppreciationsDTO(migo),
    ),
  } as {
    appreciations: RecapAppreciationsDTO[];
  };
};

export const useGetRecapAppreciations = ({ luckyId }: { luckyId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.RECAP.APPRECIATIONS, luckyId],
    queryFn: () => getRecapAppreciations(luckyId),
  });

  const hasData = !!data;

  const appreciations = hasData ? data.appreciations : [];

  return {
    isLoading,
    hasData,
    appreciations,
  };
};
