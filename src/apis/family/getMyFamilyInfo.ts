import { useQuery } from '@tanstack/react-query';
import api from '..';
import API from '../../constants/API';
import { GetMyFamilyInfoResponse } from '../../types/family';
import { UserInfoDto } from '../dtos/userDtos';

const getMyFamilyInfo = async () => {
  const { data } = await api.get<GetMyFamilyInfoResponse>(API.FAMILY.MY);
  return data?.members.map((member) => new UserInfoDto(member));
};

export const useGetMyFamilyInfo = () => {
  return useQuery({ queryKey: [API.FAMILY.MY], queryFn: getMyFamilyInfo });
};
