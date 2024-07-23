import { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';
interface ScreenRecorderProps {
  customMediaStream: MediaStream | null;
}

const ScreenRecorder = ({ customMediaStream }: ScreenRecorderProps) => {
  const { challengeId } = useParams();
  const { status: challengeStatus } = useFacetimeChallengeStore();
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: true,
    customMediaStream: customMediaStream,
    onStop: (blobUrl) => handleUploadRecord(blobUrl),
    stopStreamsOnStop: false,
    mediaRecorderOptions: {
      mimeType: 'video/mp4',
      videoBitsPerSecond: 1280000,
    },
  });
  const { mutate } = usePostFaceChallenge();

  useEffect(() => {
    if (status === 'idle' && challengeStatus === 'ongoing') {
      startRecording();
    }
    if (status === 'recording' && challengeStatus === 'finished') {
      stopRecording();
    }
  }, [status, challengeStatus]);

  const handleUploadRecord = async (blobUrl: string) => {
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
      console.log('formData:', formData);
      mutate(formData);
    } catch (error) {
      console.error('Error uploading or downloading video:', error);
    }
  };

  return null;
};

export default ScreenRecorder;
