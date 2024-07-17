import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import FACETIME from '../../../constants/FACETIME';
import FILTER from '../../../constants/FILTER';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';
import { useFilterTypeStore } from '../../../store/filterTypeStore';
import { FilterPosition } from '../../../types/challenge';

interface ScreenCapturerProps {
  videoElement: HTMLVideoElement | null;
  position: FilterPosition | null;
}

const ScreenCapturer = ({ videoElement, position }: ScreenCapturerProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { filterType } = useFilterTypeStore();
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { challengeId } = useParams();
  const { mutate } = usePostFaceChallenge();
  const countRef = useRef(1);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx || !videoElement || !position) return;

    const videoHeight = videoElement.videoHeight; // 비디오 높이
    const videoWidth = videoElement.videoWidth; // 비디오 너비

    const renderWidth = videoElement.getBoundingClientRect().width; // 화면 너비
    const renderHeight = videoElement.getBoundingClientRect().height; // 화면 높이

    const scale = 4;

    canvas.height = renderHeight * scale;
    canvas.width = renderHeight * 0.5 * scale;
    console.log(canvas);
    const cropX = ((videoWidth - renderWidth) / 2) * 0.85;

    ctx.drawImage(
      videoElement,
      cropX,
      0,
      videoHeight * 0.5,
      videoHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    const { x, y, width, height } = position;

    if (filterType !== 'none') {
      const image = new Image();
      image.src = FILTER.IMAGE[filterType];
      image.onload = () => {
        ctx.drawImage(
          image,
          (x - cropX * (renderHeight / videoHeight)) * 4,
          y * scale,
          width * scale,
          height * scale,
        );
        // 필터 이미지가 캔버스에 그려진 후에 toBlob 호출
        divRef.current?.appendChild(canvas);
        canvasToBlobAndDownload(canvas);
      };
    } else {
      // 필터가 없는 경우 바로 toBlob 호출
      canvasToBlobAndDownload(canvas);
    }
  };

  const canvasToBlobAndDownload = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const imgFile = new File([blob], `screenshot_${countRef.current}.png`, {
        type: blob.type,
      });

      countRef.current += 1;
      if (!challengeId || !imgFile) return;
      const formData = new FormData();
      formData.append('challengeId', challengeId);
      formData.append('answer', imgFile);
      mutate(formData);
    });
  };

  useEffect(() => {
    if (
      status === 'ongoing' &&
      remainingTime % FACETIME.TIMER_UNIT === 0 &&
      remainingTime < FACETIME.TIMER_UNIT * FACETIME.PHOTO_COUNT
    ) {
      handleCapture();
    }
    console.log(status, remainingTime, remainingTime % FACETIME.TIMER_UNIT);
  }, [status, remainingTime]);

  return null;
};

export default ScreenCapturer;
