import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postVoiceChallenge = async (formData: FormData) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.VOICE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const usePostVoiceChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.CHALLENGE.PHOTO],
    mutationFn: (formData: FormData) => postVoiceChallenge(formData),
    onMutate: (variables) => ({ ...variables }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.VOICE],
      }),
  });
};
