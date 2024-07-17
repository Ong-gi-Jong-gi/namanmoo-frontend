import { authorizedApi } from '..';
import API from '../../constants/API';

export const postCreateChallenge = async (challengeDate: number) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.CREATE, {
    challengeDate,
  });

  return data;
};
