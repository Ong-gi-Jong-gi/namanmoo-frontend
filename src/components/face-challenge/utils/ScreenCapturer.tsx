import { PropsWithChildren, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import FACETIME from '../../../constants/FACETIME';
import FILTER from '../../../constants/FILTER';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';
import { useFilterTypeStore } from '../../../store/filterTypeStore';
import { FilterPosition } from '../../../types/challenge';

interface ScreenCapturerProps extends PropsWithChildren {
  videoElement: HTMLVideoElement | null;
  position: FilterPosition | null;
}

const ScreenCapturer = ({
  videoElement,
  position,
  children,
}: ScreenCapturerProps) => {
  const captureRef = useRef<HTMLDivElement | null>(null);
  const { filterType } = useFilterTypeStore();
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { challengeId } = useParams();
  // const { mutate } = usePostFaceChallenge();
  const countRef = useRef(1);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    !videoElement && alert('비디오가 없습니다.');
    !ctx && alert('캔버스를 사용할 수 없습니다.');
    if (!ctx || !videoElement) return;

    const videoHeight = videoElement.videoHeight; // 비디오 높이
    const videoWidth = videoElement.videoWidth; // 비디오 너비

    const renderWidth = videoElement.getBoundingClientRect().width; // 화면 너비
    const renderHeight = videoElement.getBoundingClientRect().height; // 화면 높이

    const scale = Math.floor(300 / renderHeight);
    canvas.height = renderHeight * scale;
    canvas.width = renderHeight * 0.66 * scale;
    const cropX = Math.max(0, ((videoWidth - renderWidth) / 2) * 0.85);

    ctx.drawImage(
      videoElement,
      cropX,
      0,
      videoHeight * 0.6,
      videoHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    if (filterType !== 'none' && position) {
      const { x, y, width, height } = position;
      const image = new Image();
      image.src = FILTER.IMAGE[filterType];
      image.onload = () => {
        ctx.drawImage(
          image,
          (x - cropX * (renderHeight / videoHeight)) * scale,
          y * scale,
          width * scale,
          height * scale,
        );
        canvasToBlobAndDownload(canvas);
      };
    } else {
      // 필터가 없는 경우 바로 toBlob 호출
      canvasToBlobAndDownload(canvas);
    }
  };

  const canvasToBlobAndDownload = (canvas: HTMLCanvasElement) => {
    canvas.toBlob((blob) => {
      !blob && alert('캔버스를 이미지로 변환하는데 실패했습니다.');
      if (!blob) return;
      const imgFile = new File([blob], `screenshot_${countRef.current}.png`, {
        type: blob.type,
      });

      !challengeId && alert('챌린지 아이디가 없습니다.');
      !imgFile && alert('이미지 파일이 없습니다.');

      if (!challengeId || !imgFile) return;
      countRef.current += 1;
      const formData = new FormData();
      formData.append('challengeId', challengeId);
      formData.append('answer', imgFile);
      // mutate(formData);
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
  }, [status, remainingTime]);

  return <div ref={captureRef}>{children}</div>;
};

export default ScreenCapturer;
