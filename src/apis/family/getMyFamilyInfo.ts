import { useQuery } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';
import { GetMyFamilyInfoResponse } from '../../types/family';
import { UserInfoDto } from '../dtos/userDtos';
import { responseRoot } from './../../types/api';

const getMyFamilyInfo = async () => {
  const { data } = await authorizedApi.get<
    responseRoot<GetMyFamilyInfoResponse>
  >(API.FAMILY.MY);

  return data?.data?.members.map((member) => new UserInfoDto(member));
};

export const useGetMyFamilyInfo = () => {
  return useQuery({ queryKey: [API.FAMILY.MY], queryFn: getMyFamilyInfo });
};
