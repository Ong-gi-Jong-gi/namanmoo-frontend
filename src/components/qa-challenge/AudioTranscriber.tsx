import {
  TranscribeClient,
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommandInput,
  GetTranscriptionJobCommandInput,
} from '@aws-sdk/client-transcribe';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import uploadFileS3 from '../../utils/uploadS3';

// 환경 변수 설정
const PULL_BUCKET_NAME = import.meta.env.VITE_PULL_BUCKET_NAME as string; // 음성 파일을 가져올 S3 버킷 이름
const VITE_BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME as string; // 결과 JSON 파일을 저장할 S3 버킷 이름
const AWS_REGION = 'ap-northeast-2'; // AWS 리전

// AWS Transcribe Client 설정
const transcribeClient = new TranscribeClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_PUBLIC_KEY as string,
    secretAccessKey: import.meta.env.VITE_AWS_PRIVATE_KEY as string,
  },
});

const AudioTranscriber: React.FC<{ title: string }> = ({ title }) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string>('');
  // 녹음된 오디오의 URL
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // 녹음 시작 함수
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      // 녹음 청크 배열을 blob형태로 변환
      const audioBlob = new Blob(audioChunksRef.current, {
        type: 'audio/wav',
      });

      const audioFile = new File([audioBlob], `${title}.wav`, {
        type: audioBlob.type,
      });

      try {
        await uploadFileS3(audioFile);

        // 파일 업로드가 성공하면 Transcribe 작업 시작
        startTranscriptionJob();
      } catch (err) {
        console.error('Error uploading file to S3:', err);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  // 녹음 멈춤 함수
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Transcription Job 시작 함수
  const startTranscriptionJob = async () => {
    const params: StartTranscriptionJobCommandInput = {
      TranscriptionJobName: `TranscriptionJob-${Date.now()}`, // 고유한 작업 이름 생성
      LanguageCode: 'ko-KR', // 언어 코드 설정
      Media: {
        MediaFileUri: `https://s3.${AWS_REGION}.amazonaws.com/${PULL_BUCKET_NAME}/${title}.wav`, // S3에 업로드된 오디오 파일 URI
      },
      OutputBucketName: VITE_BUCKET_NAME, // 결과 JSON 파일을 저장할 S3 버킷 이름
      OutputKey: `result/${title}-${Date.now()}.json`, // 결과 JSON 파일의 키
    };

    try {
      // Transcription 작업 시작
      const command = new StartTranscriptionJobCommand(params);
      const response = await transcribeClient.send(command);

      // Transcription 작업 이름 및 상태 설정
      if (response.TranscriptionJob?.TranscriptionJobName) {
        setJobStatus(response.TranscriptionJob.TranscriptionJobStatus || '');
        checkTranscriptionJob(response.TranscriptionJob.TranscriptionJobName);
      }
    } catch (err) {
      console.error('Error starting transcription job:', err);
    }
  };

  // Transcription Job 상태 확인 함수
  const checkTranscriptionJob = async (jobName: string) => {
    const params: GetTranscriptionJobCommandInput = {
      TranscriptionJobName: jobName,
    };

    try {
      // Transcription 작업 상태 확인
      const command = new GetTranscriptionJobCommand(params);
      const response = await transcribeClient.send(command);

      if (response.TranscriptionJob) {
        setJobStatus(response.TranscriptionJob.TranscriptionJobStatus || '');

        // Transcription 작업이 완료되었는지 확인
        if (response.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
          const transcriptUri =
            response.TranscriptionJob.Transcript?.TranscriptFileUri;

          // Transcript URI에서 결과를 가져와서 변수에 저장
          if (transcriptUri) {
            const transcriptResponse = await fetchTranscript(transcriptUri);
            if (transcriptResponse) {
              setTranscription(
                transcriptResponse.results.transcripts[0].transcript,
              );
            }
          }
        } else {
          // 작업이 완료되지 않았으면 다시 확인
          setTimeout(() => checkTranscriptionJob(jobName), 5000);
        }
      }
    } catch (err) {
      console.error('Error checking transcription job:', err);
    }
  };

  // S3에 저장된 JSON 파일 fetch 함수
  const fetchTranscript = async (transcriptUri: string) => {
    try {
      const response = await axios.get(transcriptUri);
      return response.data;
    } catch (err) {
      console.error('Error fetching transcript:', err);
      return null;
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div>Status: {jobStatus}</div>
      {transcription && (
        <div>
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioTranscriber;
