import { useCallback, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useFacetimeChallengeStore } from '../../store/facetimeChallengeStore';
interface ScreenRecorderProps {
  customMediaStream: MediaStream | null;
}

const ScreenRecorder = ({ customMediaStream }: ScreenRecorderProps) => {
  const { status: challengeStatus } = useFacetimeChallengeStore();
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      customMediaStream: customMediaStream,
      mediaRecorderOptions: {
        mimeType: 'video/webm',
        videoBitsPerSecond: 500000,
      },
    });

  const handleRecording = useCallback(() => {
    if (status === 'idle' && challengeStatus === 'ongoing') {
      startRecording();
    }
    if (status === 'recording' && challengeStatus === 'finished') {
      console.log('stop recording');
      stopRecording();
    }
  }, [status, challengeStatus, startRecording, stopRecording]);

  const uploadAndDownloadVideo = useCallback(async (blobUrl: string) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      // Upload the video to the server
      const formData = new FormData();
      formData.append('video', blob, 'recording.webm');
      await fetch('YOUR_SERVER_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      // Create a downloadable link for the video
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'recording.webm';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error uploading or downloading video:', error);
    }
  }, []);

  useEffect(() => {
    handleRecording();
  }, [handleRecording]);

  useEffect(() => {
    if (mediaBlobUrl) {
      uploadAndDownloadVideo(mediaBlobUrl);
    }
  }, [mediaBlobUrl, uploadAndDownloadVideo]);

  return <></>;
};

export default ScreenRecorder;
