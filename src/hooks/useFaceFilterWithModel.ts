import { useCallback, useEffect, useRef, useState } from 'react';
import FILTER from '../constants/FILTER';
import { useFaceLandmarker } from '../store/faceLandmarkerStore';
import { useFilterTypeStore } from '../store/filterTypeStore';
import { FilterPosition, VideoSize } from '../types/challenge';

const videoSize = {
  width: 640,
  height: 480,
};

const useFaceFilterWithModel = (
  video: HTMLVideoElement | null,
  isFilterActive: boolean,
) => {
  const { filterType } = useFilterTypeStore();
  const { faceLandmarker, isLoaded, loadFaceLandmarker } = useFaceLandmarker();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterImage, setFilterImage] = useState<HTMLImageElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [position, setPosition] = useState<FilterPosition | null>(null);
  const [actualVideoSize, setActualVideoSize] = useState<VideoSize>(videoSize);
  const animationFrameId = useRef<number | null>(null);

  const estimateFacesLoop = useCallback(() => {
    if (filterType === 'none' || !isFilterActive) return;
    if (!video || !filterImage || !ctx || !faceLandmarker) return;

    const actualWidth = video.getBoundingClientRect().width;
    const actualHeight = video.getBoundingClientRect().height;
    setActualVideoSize({ width: actualWidth, height: actualHeight });

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
        setPosition({ x, y, width, height });

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
    video,
    isFilterActive,
  ]);

  useEffect(() => {
    if (!canvasRef.current) return;
    setCtx(canvasRef.current.getContext('2d'));
    // 캔버스 크기를 비디오 크기와 맞춤
    if (video) {
      canvasRef.current.width = video.getBoundingClientRect().width;
      canvasRef.current.height = video.getBoundingClientRect().height;
    }
  }, [canvasRef, video]);

  useEffect(() => {
    if (!filterType || filterType === 'none') return;
    const image = new Image();
    image.src = FILTER.IMAGE[filterType];
    image.onload = () => {
      setFilterImage(image);
    };
  }, [filterType, isFilterActive]);

  useEffect(() => {
    if (
      (filterImage && ctx && isLoaded && video && filterType !== 'none') ||
      !isFilterActive
    ) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() =>
        estimateFacesLoop(),
      );
    } else if ((!isFilterActive || filterType === 'none') && ctx) {
      ctx.clearRect(
        0,
        0,
        canvasRef.current?.width || videoSize.width,
        canvasRef.current?.height || videoSize.height,
      );
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [
    estimateFacesLoop,
    filterImage,
    ctx,
    isLoaded,
    filterType,
    video,
    isFilterActive,
  ]);

  return { canvasRef, position, actualVideoSize };
};
export default useFaceFilterWithModel;
