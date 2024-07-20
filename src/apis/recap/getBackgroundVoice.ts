import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const getBackgroundVoice = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.BACKGROUND_VOICE}?luckyId=${luckyId}`,
  );

  return { backgroundVoice: data.data.backgroundVoice } as {
    backgroundVoice: string;
  };
};

export const useGetBackgroundVoice = ({ luckyId }: { luckyId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [API.RECAP.BACKGROUND_VOICE],
    queryFn: () => getBackgroundVoice(luckyId),
  });

  const hasData = !!data;

  const { backgroundVoice } = hasData ? data : { backgroundVoice: '' };

  return {
    hasData,
    isLoading,
    backgroundVoice,
  };
};
