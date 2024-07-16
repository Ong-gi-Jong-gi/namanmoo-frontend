import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const getFamilyPhotoRecap = async (luckyId: string) => {
  const { data } = await authorizedApi.get(
    `${API.RECAP.FAMILY_PHOTO}?luckyId=${luckyId}`,
  );

  const { familyPhoto, others } = data.data;
  return { mainPhoto: familyPhoto, otherPhotos: others } as {
    mainPhoto: string;
    otherPhotos: string[];
  };
};

export const useGetFamilyPhotoRecap = ({ luckyId }: { luckyId: string }) => {
  return useQuery({
    queryKey: [API.RECAP.FAMILY_PHOTO, luckyId],
    queryFn: () => getFamilyPhotoRecap(luckyId),
  });
};
