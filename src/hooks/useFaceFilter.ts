import { useCallback, useEffect, useRef, useState } from 'react';
import FILTER from '../constants/FILTER';
import { FilterPosition, FilterType, VideoSize } from '../types/challenge';

const videoSize = {
  width: 640,
  height: 480,
};

const useFaceFilter = (
  video: HTMLVideoElement | null,
  isFilterActive: boolean,
  filterType: FilterType,
  position: FilterPosition | null,
  otherVideoSize: VideoSize,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterImage, setFilterImage] = useState<HTMLImageElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const estimateFacesLoop = useCallback(() => {
    if (filterType === 'none' || !isFilterActive) return;
    if (!video || !filterImage || !ctx || !position) return;

    const actualHeight = video.getBoundingClientRect().height;
    const actualWidth = actualHeight * (video.videoWidth / video.videoHeight);
    ctx.clearRect(0, 0, actualWidth, actualHeight);
    canvasRef.current!.width = actualWidth;
    canvasRef.current!.height = actualHeight;
    const scaleX = actualWidth / otherVideoSize.width;
    const scaleY = actualHeight / otherVideoSize.height;

    const { x, y, width, height } = position;
    ctx.drawImage(
      filterImage,
      x * scaleX,
      y * scaleY,
      width * scaleX,
      height * scaleY,
    );
  }, [
    ctx,
    filterImage,
    filterType,
    video,
    isFilterActive,
    position,
    otherVideoSize,
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
      (filterImage && ctx && video && filterType !== 'none') ||
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
  }, [estimateFacesLoop, filterImage, ctx, filterType, video, isFilterActive]);

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return { canvasRef };
};
export default useFaceFilter;
