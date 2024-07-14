import { useCallback, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../apis/challenge/postFaceChallenge';
import { useFacetimeChallengeStore } from '../../store/facetimeChallengeStore';
interface ScreenRecorderProps {
  customMediaStream: MediaStream | null;
}

const ScreenRecorder = ({ customMediaStream }: ScreenRecorderProps) => {
  const { challengeId } = useParams();
  const { status: challengeStatus } = useFacetimeChallengeStore();
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      customMediaStream: customMediaStream,
      mediaRecorderOptions: {
        mimeType: 'video/webm',
        videoBitsPerSecond: 2560000,
      },
    });
  const { mutate } = usePostFaceChallenge();

  const handleRecording = useCallback(() => {
    if (status === 'idle' && challengeStatus === 'ongoing') {
      startRecording();
    }
    if (status === 'recording' && challengeStatus === 'finished') {
      console.log('stop recording');
      stopRecording();
    }
  }, [status, challengeStatus, startRecording, stopRecording]);

  const uploadRecord = useCallback(
    async (blobUrl: string) => {
      try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        if (!blob) return;

        const videoFile = new File([blob], 'video.webm', {
          type: blob.type,
        });
        if (!challengeId || !videoFile) return;

        const formData = new FormData();
        formData.append('challengeId', challengeId);
        formData.append('answer', videoFile);
        mutate(formData);
      } catch (error) {
        console.error('Error uploading or downloading video:', error);
      }
    },
    [challengeId, mutate],
  );

  useEffect(() => {
    handleRecording();
  }, [handleRecording]);

  useEffect(() => {
    if (mediaBlobUrl) {
      uploadRecord(mediaBlobUrl);
    }
  }, [mediaBlobUrl, uploadRecord]);

  return <></>;
};

export default ScreenRecorder;
