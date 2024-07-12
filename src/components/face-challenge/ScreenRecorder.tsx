import { useState, useRef } from 'react';

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const recorder = new MediaRecorder(stream);
      let chunks: Blob[] = []; // 임시 청크 배열을 정의합니다.

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data); // 이벤트가 발생할 때마다 청크를 추가합니다.
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' }); // 임시 청크 배열을 사용하여 Blob을 생성합니다.
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recorded-screen.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        chunks = []; // 녹화가 중지된 후 청크 배열을 초기화합니다.
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing display media.', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default ScreenRecorder;
