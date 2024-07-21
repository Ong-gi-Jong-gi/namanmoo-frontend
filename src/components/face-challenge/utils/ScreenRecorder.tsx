import { useCallback, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';
interface ScreenRecorderProps {
  customMediaStream: MediaStream | null;
}

const ScreenRecorder = ({ customMediaStream }: ScreenRecorderProps) => {
  const { challengeId } = useParams();
  const clonedMediaStream = customMediaStream
    ? customMediaStream.clone()
    : null;
  const { status: challengeStatus } = useFacetimeChallengeStore();
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      customMediaStream: clonedMediaStream,
      onStop: async (blobUrl: string) => {
        await uploadRecord(blobUrl);
      },
      mediaRecorderOptions: {
        mimeType: 'video/mp4',
        videoBitsPerSecond: 2560000,
      },
    });
  const { mutate } = usePostFaceChallenge();

  const handleRecording = useCallback(() => {
    if (status === 'idle' && challengeStatus === 'ongoing') {
      startRecording();
    }
    if (status === 'recording' && challengeStatus === 'finished') {
      stopRecording();
    }
  }, [status, challengeStatus, startRecording, stopRecording]);

  useEffect(() => {
    handleRecording();
  }, [handleRecording]);

  const uploadRecord = async (blobUrl: string) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      if (!blob) return;

      const videoFile = new File([blob], 'video.mp4', {
        type: 'video/mp4',
      });
      if (!challengeId || !videoFile) return;

      const formData = new FormData();
      formData.append('challengeId', challengeId);
      formData.append('answer', videoFile);
      mutate(formData);
    } catch (error) {
      console.error('Error uploading or downloading video:', error);
    }
  };

  return null;
};

export default ScreenRecorder;
