import React, { useState, useRef, useEffect } from 'react';
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { HiMiniStop } from 'react-icons/hi2';
import { MdFiberManualRecord } from 'react-icons/md';
import { usePostVoiceChallenge } from '../../apis/challenge/postVoiceChallenge';
import Button from '../common/Button';

interface Props {
  question: string;
  challengeId: string;
  downTrigger: () => void;
  existedVoice: string | null;
}

const VoiceRecoder: React.FC<Props> = ({
  challengeId,
  downTrigger,
  question,
  existedVoice,
}) => {
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordFile, setRecordFile] = useState<File | string | null>(
    existedVoice,
  );
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [blob, setBlob] = useState<Blob>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const movingBarRef = useRef<HTMLDivElement>(null);
  const { mutate } = usePostVoiceChallenge();

  const mutateVoiceForm = async (fileData: File | null) => {
    const formData = new FormData();

    if (challengeId) formData.append('challengeId', challengeId);
    if (fileData) formData.append('answer', fileData);

    mutate(formData, {
      onSuccess: (data) => {
        setTranscription(data.data.answer);
      },
    });
  };

  const startRecording = async () => {
    try {
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
        mutateVoiceForm(audioFile);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Could not start audio source', error);
      alert('마이크 접근 권한이 필요합니다. 브라우저 설정을 확인해주세요.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && movingBarRef.current) {
      const audioElement = audioRef.current;

      const handleTimeUpdate = () => {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        if (duration) {
          const percentage = (currentTime / duration) * 100;
          movingBarRef.current!.style.left = `${percentage}%`;
        }
      };

      const handleEnded = () => {
        movingBarRef.current!.style.left = '0%';
      };

      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      audioElement.addEventListener('ended', handleEnded);

      audioElement.onloadedmetadata = () => {
        const duration = audioElement.duration;
        if (duration) {
          movingBarRef.current!.style.setProperty(
            '--animation-duration',
            `${duration}s`,
          );
        }
      };

      audioElement.onplay = () => {
        movingBarRef.current!.classList.add('move');
      };

      audioElement.onpause = () => {
        movingBarRef.current!.classList.remove('move');
      };

      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        audioElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [blob]);

  const handleSubmitBtn = () => {
    downTrigger();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center rounded-xl bg-background p-4 font-ryurue text-ryurue-base">
        <p>[질문]</p>
        <p>{question}</p>
        <p>[내가 말한 문장]</p>
        <div>{transcription ? <p>{transcription}</p> : ''}</div>
      </div>
      <div className="flex h-fit min-h-[75px] w-full items-center justify-center overflow-hidden rounded-xl bg-background">
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
              <div
                className="relative flex flex-col items-center gap-2"
                onClick={handleAudioPlay}
              >
                <span className="py-4">
                  <AudioVisualizer
                    blob={blob}
                    width={350}
                    height={75}
                    barWidth={3}
                    gap={2}
                    barColor={'#E16262'}
                  />
                </span>
                <audio
                  className="hidden w-full"
                  ref={audioRef}
                  controls
                  src={
                    typeof recordFile == 'string'
                      ? recordFile
                      : URL.createObjectURL(recordFile)
                  }
                />
                <div
                  className="moving-bar absolute left-0 top-0 h-full w-1 bg-secondary-20"
                  ref={movingBarRef}
                ></div>
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
          label="완료"
          theme="primary"
          size="small"
          onClick={handleSubmitBtn}
        />
      </div>
    </div>
  );
};

export default VoiceRecoder;
