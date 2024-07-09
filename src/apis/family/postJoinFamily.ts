import { useMutation } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { UserRole } from '../../types/family';

const postJoinFamily = async (familyId: string, role: UserRole) => {
  const { data } = await authorizedApi.post(API.FAMILY.JOIN, {
    familyId,
    role,
  });

  return {
    familyId: data.data.familyId,
  };
};

export const usePostJoinFamily = () => {
  return useMutation({
    mutationKey: [API.FAMILY.JOIN],
    mutationFn: ({ familyId, role }: { familyId: string; role: UserRole }) =>
      postJoinFamily(familyId, role),
  });
};
