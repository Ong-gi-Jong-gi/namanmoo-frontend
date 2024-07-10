import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { UserRole } from '../../types/family';
import { FamilyCodeDto } from '../dtos/familyDtos';

const postCreateFamily = async (
  familySize: number,
  familyName: string,
  ownerRole: UserRole | '',
) => {
  const { data } = await authorizedApi.post(API.FAMILY.CREATE, {
    familyName,
    familySize,
    ownerRole,
  });

  return {
    code: data.data.code,
  } as FamilyCodeDto;
};

export const useCreateFamily = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [API.FAMILY.CREATE],
    mutationFn: ({
      familyName,
      familySize,
      ownerRole,
    }: {
      familyName: string;
      familySize: number;
      ownerRole: UserRole | '';
    }) => postCreateFamily(familySize, familyName, ownerRole),
    onSuccess: (data) => {
      navigate(`/main?code=${data.code}`);
    },
  });
};
