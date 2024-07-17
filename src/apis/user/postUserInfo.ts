import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postUserInfo = async (formData: FormData) => {
  const { data } = await authorizedApi.post(API.USER, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const usePostUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.USER],
    mutationFn: (postForm: FormData) => postUserInfo(postForm),
    onMutate: (variables) => ({ ...variables }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [API.USER],
      }),
  });
};
