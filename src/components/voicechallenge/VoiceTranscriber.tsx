import {
  TranscribeClient,
  StartTranscriptionJobCommand,
  GetTranscriptionJobCommand,
  StartTranscriptionJobCommandInput,
  GetTranscriptionJobCommandInput,
} from '@aws-sdk/client-transcribe';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { HiMiniStop } from 'react-icons/hi2';
import { MdFiberManualRecord } from 'react-icons/md';
import uploadFileS3 from '../../utils/uploadS3';
import Button from '../common/Button';

const PULL_BUCKET_NAME = import.meta.env.VITE_PULL_BUCKET_NAME as string;
const VITE_BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME as string;
const AWS_REGION = 'ap-northeast-2';

const transcribeClient = new TranscribeClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_PUBLIC_KEY as string,
    secretAccessKey: import.meta.env.VITE_AWS_PRIVATE_KEY as string,
  },
});

interface Props {
  question: string;
  mutate: (fileData: File | null) => void;
  downTrigger: () => void;
}

const AudioTranscriber: React.FC<Props> = ({
  mutate,
  downTrigger,
  question,
}) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordFile, setRecordFile] = useState<File | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [blob, setBlob] = useState<Blob>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: 'audio/wav',
      });

      const audioFile = new File([audioBlob], `audio.wav`, {
        type: audioBlob.type,
      });

      setRecordFile(audioFile);
      setBlob(audioBlob);

      try {
        await uploadFileS3(audioFile);
        startTranscriptionJob();
      } catch (err) {
        console.error('Error uploading file to S3:', err);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const startTranscriptionJob = async () => {
    const params: StartTranscriptionJobCommandInput = {
      TranscriptionJobName: `TranscriptionJob-${Date.now()}`,
      LanguageCode: 'ko-KR',
      Media: {
        MediaFileUri: `https://s3.${AWS_REGION}.amazonaws.com/${PULL_BUCKET_NAME}/audio.wav`,
      },
      OutputBucketName: VITE_BUCKET_NAME,
      OutputKey: `result/audio-${Date.now()}.json`,
    };

    try {
      const command = new StartTranscriptionJobCommand(params);
      const response = await transcribeClient.send(command);

      if (response.TranscriptionJob?.TranscriptionJobName) {
        setJobStatus(response.TranscriptionJob.TranscriptionJobStatus || '');
        checkTranscriptionJob(response.TranscriptionJob.TranscriptionJobName);
      }
    } catch (err) {
      console.error('Error starting transcription job:', err);
    }
  };

  const checkTranscriptionJob = async (jobName: string) => {
    const params: GetTranscriptionJobCommandInput = {
      TranscriptionJobName: jobName,
    };

    try {
      const command = new GetTranscriptionJobCommand(params);
      const response = await transcribeClient.send(command);

      if (response.TranscriptionJob) {
        setJobStatus(response.TranscriptionJob.TranscriptionJobStatus || '');

        if (response.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
          const transcriptUri =
            response.TranscriptionJob.Transcript?.TranscriptFileUri;

          if (transcriptUri) {
            const transcriptResponse = await fetchTranscript(transcriptUri);
            if (transcriptResponse) {
              console.log(transcriptResponse);
              setTranscription(
                transcriptResponse.results.transcripts[0].transcript,
              );
            }
          }
        } else {
          setTimeout(() => checkTranscriptionJob(jobName), 5000);
        }
      }
    } catch (err) {
      console.error('Error checking transcription job:', err);
    }
  };

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center rounded-xl bg-background p-4 font-ryurue text-ryurue-base">
        <p>[질문]</p>
        <p>{question}</p>
        <p>[내가 말한 문장]</p>
        <div>{transcription ? <p>{transcription}</p> : ''}</div>
      </div>
      <div className="flex h-fit w-full items-center justify-center overflow-hidden rounded-xl bg-background p-2">
        {isRecording
          ? mediaRecorderRef.current && (
              <LiveAudioVisualizer
                mediaRecorder={mediaRecorderRef.current}
                width={400}
                height={75}
                barWidth={3}
                gap={2}
                barColor={'#E16262'}
              />
            )
          : recordFile &&
            blob && (
              <div className="flex flex-col items-center gap-2">
                <AudioVisualizer
                  blob={blob}
                  width={350}
                  height={75}
                  barWidth={3}
                  gap={2}
                  barColor={'#E16262'}
                />
                <audio
                  className="w-full"
                  ref={audioRef}
                  controls
                  src={URL.createObjectURL(recordFile)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}
      </div>
      <div className="flex items-center justify-between">
        <Button
          label="취소"
          theme="subtle"
          size="small"
          onClick={downTrigger}
        />

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-30 text-red"
        >
          {isRecording ? (
            <HiMiniStop size={40} />
          ) : (
            <MdFiberManualRecord size={50} />
          )}
        </button>

        <Button
          label="제출"
          theme="primary"
          disabled={recordFile == null}
          size="small"
          onClick={() => mutate(recordFile)}
        />
      </div>
      <div>Status: {jobStatus}</div>
    </div>
  );
};

export default AudioTranscriber;
