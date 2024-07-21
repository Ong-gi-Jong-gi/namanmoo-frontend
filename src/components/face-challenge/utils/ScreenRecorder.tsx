import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface ScreenRecorderProps {
  customMediaStream: MediaStream | null;
}

const ScreenRecorder = ({ customMediaStream }: ScreenRecorderProps) => {
  const { challengeId } = useParams();
  const { status: challengeStatus } = useFacetimeChallengeStore();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState(false);
  const mediaChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(customMediaStream);

  const { mutate } = usePostFaceChallenge();

  const startRecording = useCallback(() => {
    if (streamRef.current && !mediaRecorder) {
      const recorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/mp4',
        videoBitsPerSecond: 2560000,
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          mediaChunks.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const blob = new Blob(mediaChunks.current, { type: 'video/mp4' });
        const blobUrl = URL.createObjectURL(blob);
        await uploadRecord(blobUrl);
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
    }
  }, [mediaRecorder]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder, isRecording]);

  useEffect(() => {
    if (challengeStatus === 'ongoing') {
      startRecording();
    }
    if (challengeStatus === 'finished') {
      stopRecording();
    }
  }, [challengeStatus, startRecording, stopRecording]);

  useEffect(() => {
    // Cleanup function to stop recording when component unmounts
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isRecording, stopRecording]);

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
      console.log('formData:', formData);
      mutate(formData);
    } catch (error) {
      console.error('Error uploading or downloading video:', error);
    }
  };

  return null;
};

export default ScreenRecorder;
