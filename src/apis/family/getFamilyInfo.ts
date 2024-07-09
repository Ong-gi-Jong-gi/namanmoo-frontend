import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { responseRoot } from '../../types/api';
import { GetFamilyInfoResponse } from '../../types/family';
import { FamilyInfoDto } from '../dtos/familyDtos';

const getFamilyInfo = async (code: string) => {
  try {
    const { data } = await authorizedApi.get<
      responseRoot<GetFamilyInfoResponse>
    >(`${API.FAMILY.INFO}?code=${code}`);

    if (data.status === '400') {
      throw new Error('유효하지 않은 코드 번호 입니다.');
    }

    return {
      familyData: new FamilyInfoDto(data.data),
    } as { familyData: FamilyInfoDto };
  } catch (error) {
    if ((error as AxiosError).response?.status === 409) {
      throw new Error('적절하지 않은 동작입니다.');
    }
    throw error;
  }
};

export const useGetFamilyInfo = (
  { code }: { code: string },
  enabled: boolean,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [API.FAMILY.INFO, code],
    queryFn: () => getFamilyInfo(code),
    enabled,
  });

  const hasData = !!data;

  const { familyId, familyName, members } = hasData
    ? data.familyData
    : { familyId: '', familyName: '', members: [] };

  return { hasData, isLoading, familyId, familyName, members, error };
};
