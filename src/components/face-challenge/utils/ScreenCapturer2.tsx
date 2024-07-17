import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface ScreenCapturerProps {
  videoElement: HTMLVideoElement | null;
  position: 
}

const ScreenCapturer = ({ videoElement, position }: ScreenCapturerProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { challengeId } = useParams();
  const { mutate } = usePostFaceChallenge();
  const countRef = useRef(1);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (!videoElement) return;
    const renderWidth = videoElement.getBoundingClientRect().width; // 화면 너비
    const renderHeight = videoElement.getBoundingClientRect().height; // 화면 높이
    const ratio = renderHeight / videoElement.videoHeight; // 비율
    const actualWidth = videoElement.videoWidth * ratio; // 실제 너비

    canvas.width = renderWidth;
    canvas.height = renderHeight;
    const cropX = (actualWidth - renderWidth) / 2;

    ctx.drawImage(
      videoElement,
      cropX / ratio,
      0,
      videoElement.videoHeight * (renderWidth / renderHeight),
      videoElement.videoHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
    screenRef.current && screenRef.current.appendChild(canvas);
    // canvas.toBlob((blob) => {
    //   if (!blob) return;
    //   const imgFile = new File([blob], `screenshot_${countRef.current}.png`, {
    //     type: blob.type,
    //   });
    //   countRef.current += 1;
    //   if (!challengeId || !imgFile) return;
    //   const formData = new FormData();
    //   formData.append('challengeId', challengeId);
    //   formData.append('answer', imgFile);
    //   mutate(formData);
    // });
  };

  return (
    <div ref={screenRef}>
      <button onClick={handleCapture}>찰칵</button>
    </div>
  );
};

export default ScreenCapturer;
