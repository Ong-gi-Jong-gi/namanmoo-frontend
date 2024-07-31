import { useCallback, useEffect, useRef, useState } from 'react';
import FILTER from '../constants/FILTER';
import { useFilterTypeStore } from '../store/filterTypeStore';
import {
  FilterPosition,
  FilterTypeWithoutNone,
  VideoSize,
} from '../types/challenge';

const videoSize = {
  width: 640,
  height: 480,
};

const useFaceFilterWithModel = (
  video: HTMLVideoElement | null,
  isFilterActive: boolean,
) => {
  const { filterType } = useFilterTypeStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterImage, setFilterImage] = useState<HTMLImageElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [position, setPosition] = useState<FilterPosition | null>(null);
  const [actualVideoSize, setActualVideoSize] = useState<VideoSize>(videoSize);
  const animationFrameId = useRef<number | null>(null);
  const lastProcessedTimeRef = useRef<number>(0);
  const processInterval = 60; // 60ms 간격으로 얼굴 필터 업데이트

  const workerRef = useRef<Worker | null>(null);

  const estimateFacesLoop = useCallback(() => {
    const now = performance.now();
    if (now - lastProcessedTimeRef.current < processInterval) {
      animationFrameId.current = requestAnimationFrame(estimateFacesLoop);
      return;
    }
    lastProcessedTimeRef.current = now;
    if (filterType === 'none' || !isFilterActive) return;
    if (!video || !filterImage || !ctx) return;

    const actualHeight = video.getBoundingClientRect().height;
    const actualWidth = actualHeight * (video.videoWidth / video.videoHeight);
    setActualVideoSize({ width: actualWidth, height: actualHeight });

    if (actualWidth === 0 || actualHeight === 0) {
      console.error('비디오 크기가 0입니다.');
      animationFrameId.current = requestAnimationFrame(estimateFacesLoop);
      return;
    }

    // OffscreenCanvas를 이용해 비디오 프레임을 복사
    const offscreenCanvas = new OffscreenCanvas(
      video.videoWidth,
      video.videoHeight,
    );
    const offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const videoFrame = offscreenCanvas.transferToImageBitmap(); // OffscreenCanvas를 ImageBitmap으로 변환

    // Worker로 비디오 프레임 전달
    workerRef.current?.postMessage({
      action: 'detect',
      videoFrame,
      videoWidth: actualWidth,
      videoHeight: actualHeight,
    });
  }, [ctx, filterImage, filterType, video, isFilterActive]);

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
  }, [filterType]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../utils/faceDetectionWorker.ts', import.meta.url),
    );

    workerRef.current.postMessage({ action: 'init' });
  }, []);

  useEffect(() => {
    if (!workerRef.current || !video) return;
    workerRef.current.onmessage = (event) => {
      const { status, faceLandmarks } = event.data;
      if (status === 'initialized') {
        console.log('FaceLandmarker 모델 초기화 완료');
      }

      if (faceLandmarks && faceLandmarks.length > 0) {
        const { width, height } = actualVideoSize;
        const padding = (width - video!.getBoundingClientRect().width) / 2;

        ctx?.clearRect(0, 0, width, height);
        canvasRef.current!.width = width;
        canvasRef.current!.height = height;

        const position = FILTER.CALCULATOR[filterType as FilterTypeWithoutNone](
          faceLandmarks[0],
          width,
          height,
        );

        if (position) {
          setPosition(position);
          ctx?.drawImage(
            filterImage!,
            position.x - padding,
            position.y,
            position.width,
            position.height,
          );
        }
      }

      animationFrameId.current = requestAnimationFrame(estimateFacesLoop);

      return () => {
        workerRef.current?.terminate();
      };
    };
  }, [actualVideoSize, ctx, estimateFacesLoop, filterImage, filterType, video]);

  useEffect(() => {
    if (
      isFilterActive &&
      filterImage &&
      ctx &&
      video &&
      filterType !== 'none'
    ) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(() =>
        estimateFacesLoop(),
      );
    } else if (!isFilterActive || filterType === 'none') {
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          canvasRef.current?.width || videoSize.width,
          canvasRef.current?.height || videoSize.height,
        );
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    }
  }, [estimateFacesLoop, filterImage, ctx, filterType, video, isFilterActive]);

  // 언마운트 시 애니메이션 프레임 정리
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { canvasRef, position, actualVideoSize };
};

export default useFaceFilterWithModel;
