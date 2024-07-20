import { useMutation } from '@tanstack/react-query';
import { authorizedApi } from '..';
import API from '../../constants/API';

const postFaceChallenge = async (formData: FormData) => {
  const { data } = await authorizedApi.post(API.CHALLENGE.FACE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const usePostFaceChallenge = () => {
  return useMutation({
    mutationKey: [API.CHALLENGE.FACE],
    mutationFn: (formData: FormData) => postFaceChallenge(formData),
    onSuccess: () => {
      alert('사진 전송 완료.');
    },
    onError: () => {
      alert('사진 전송 실패.');
    },
  });
};
