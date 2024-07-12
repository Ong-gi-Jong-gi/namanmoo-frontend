import { ParticipantTile, useTrackRefContext } from '@livekit/components-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import FILTER from '../../constants/FILTER';
import { useFaceLandmarker } from '../../store/faceLandmarkerStore';
import { useFilterTypeStore } from '../../store/filterTypeStore';

const videoSize = {
  width: 640,
  height: 480,
};

const CustomParticipantTile = () => {
  const { filterType } = useFilterTypeStore();
  const trackRef = useTrackRefContext();
  const { faceLandmarker, isLoaded, loadFaceLandmarker } = useFaceLandmarker();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterImage, setFilterImage] = useState<HTMLImageElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const estimateFacesLoop = useCallback(() => {
    if (filterType === 'none') return;
    const video = trackRef.publication?.track
      ?.attachedElements[0] as HTMLVideoElement;
    if (!video || !filterImage || !ctx || !faceLandmarker) return;

    const actualWidth = video.getBoundingClientRect().width;
    const actualHeight = video.getBoundingClientRect().height;

    if (actualWidth === 0 || actualHeight === 0) {
      console.error('Invalid video dimensions.');
      animationFrameId.current = requestAnimationFrame(estimateFacesLoop);
      return;
    }

    const startTimeMs = performance.now();
    try {
      const { faceLandmarks } = faceLandmarker.detectForVideo(
        video,
        startTimeMs,
      );
      if (faceLandmarks && faceLandmarks.length > 0) {
        // 캔버스 초기화
        ctx.clearRect(0, 0, actualWidth, actualHeight);
        canvasRef.current!.width = actualWidth;
        canvasRef.current!.height = actualHeight;

        // 필터 위치 계산
        const position = FILTER.CALCULATOR[filterType](
          faceLandmarks[0],
          actualWidth,
          actualHeight,
        );

        if (!position) {
          console.warn('Failed to calculate filter position.');
          animationFrameId.current = requestAnimationFrame(estimateFacesLoop);
          return;
        }

        const { x, y, width, height } = position;

        // 필터 그리기
        ctx.drawImage(filterImage, x, y, width, height);
      } else {
        console.warn('No face landmarks detected.');
        animationFrameId.current = requestAnimationFrame(estimateFacesLoop);
        return;
      }
    } catch (error) {
      // 오류 발생 시 초기화 후 몇 초 후 재시도
      setTimeout(() => {
        loadFaceLandmarker();
      }, 1000); // 1초 후 재시도
      return;
    }

    animationFrameId.current = requestAnimationFrame(estimateFacesLoop);
  }, [
    ctx,
    faceLandmarker,
    filterImage,
    loadFaceLandmarker,
    filterType,
    trackRef,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!trackRef.publication?.track?.attachedElements) return;
    const video = trackRef.publication?.track
      .attachedElements[0] as HTMLVideoElement;
    setCtx(canvasRef.current.getContext('2d'));
    // 캔버스 크기를 비디오 크기와 맞춤
    if (video) {
      canvasRef.current.width = video.getBoundingClientRect().width;
      canvasRef.current.height = video.getBoundingClientRect().height;
    }
  }, [canvasRef, trackRef]);

  useEffect(() => {
    if (!filterType || filterType === 'none') return;
    const image = new Image();
    image.src = FILTER.IMAGE[filterType];
    image.onload = () => {
      setFilterImage(image);
    };
  }, [filterType]);

  useEffect(() => {
    if (
      filterImage &&
      ctx &&
      isLoaded &&
      trackRef.publication?.track?.attachedElements &&
      filterType !== 'none'
    ) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() =>
        estimateFacesLoop(),
      );
    } else if (filterType === 'none' && ctx) {
      ctx.clearRect(0, 0, videoSize.width, videoSize.height);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [estimateFacesLoop, filterImage, ctx, isLoaded, trackRef, filterType]);

  return (
    <div className="relative">
      <ParticipantTile />
      <canvas className="absolute left-0 top-0 -scale-x-100" ref={canvasRef} />
    </div>
  );
};

export default CustomParticipantTile;
