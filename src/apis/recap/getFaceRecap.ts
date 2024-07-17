import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const getFaceRecap = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.FACE}?luckyId=${luckyId}`,
  );

  return data.data as { video: string[]; challengeDate: string };
};

export const useGetFaceRecap = ({ luckyId }: { luckyId: string }) => {
  return useQuery({
    queryKey: [API.RECAP.FACE, luckyId],
    queryFn: () => getFaceRecap(luckyId),
  });
};
