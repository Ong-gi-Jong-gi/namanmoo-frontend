import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postPhotoCallenge = async (formData: FormData) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.PHOTO, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const usePostPhotoChallenge = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.CHALLENGE.PHOTO],
    mutationFn: (formData: FormData) => postPhotoCallenge(formData),
    onMutate: (variables) => ({ ...variables }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [API.CHALLENGE.PHOTO],
      });
    },
  });
};
