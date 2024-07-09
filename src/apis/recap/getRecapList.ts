import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { RecapUnit } from '../../types/recap';
import { RecapUnitDTO } from '../dtos/recapDtos';

const getRecapList = async () => {
  const { data } = await authorizedApi.get(`${API.RECAP.LIST}`);

  return {
    recapList: data.data.map(
      (recapUnit: RecapUnit) => new RecapUnitDTO(recapUnit),
    ),
  } as { recapList: RecapUnitDTO[] };
};

export const useGetRecapList = () => {
  const { data, isLoading } = useQuery({
    queryKey: [API.RECAP.LIST],
    queryFn: () => getRecapList(),
  });

  const hasData = !!data;

  const { recapList } = hasData ? data : { recapList: [] };

  return {
    hasData,
    isLoading,
    recapList,
  };
};
