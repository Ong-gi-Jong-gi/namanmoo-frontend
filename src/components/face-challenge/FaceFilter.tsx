import { useTrackRefContext } from '@livekit/components-react';
import { type FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateSunglassesPosition } from '../../utils/calculateFilterPosition';
import { loadFaceLandmarker } from '../../utils/loadModel';

function FaceFilter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialLoadedRef = useRef<boolean>(false);
  const trackRef = useTrackRefContext();
  const trackCanvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const loadImageAndSetupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context || initialLoadedRef.current) return;

    initialLoadedRef.current = true;

    const img = new Image();
    img.src = 'src/assets/filter/sunglasses.png';
    img.onload = () => setImage(img);

    setCanvasContext(context);
  }, []);

  const estimateFacesLoop = useCallback(
    (
      model: FaceLandmarksDetector,
      image: HTMLImageElement,
      ctx: CanvasRenderingContext2D,
    ) => {
      if (!trackRef) return;
      const video = trackRef?.publication?.track
        ?.attachedElements[0] as HTMLVideoElement;

      if (!video) return;
      const actualWidth = video.getBoundingClientRect().width;
      const actualHeight = video.getBoundingClientRect().height;

      trackCanvasRef.current!.width = actualWidth;
      trackCanvasRef.current!.height = actualHeight;
      const trackCtx = trackCanvasRef.current!.getContext('2d');
      trackCtx?.drawImage(video, 0, 0, actualWidth, actualHeight);
      const trackImageData = trackCtx?.getImageData(
        0,
        0,
        actualWidth,
        actualHeight,
      );

      if (!trackImageData) return;

      model.estimateFaces(video).then((face) => {
        canvasRef.current!.width = actualWidth;
        canvasRef.current!.height = actualHeight;

        ctx.clearRect(0, 0, actualWidth, actualHeight);
        if (face[0]) {
          const { x, y, width, height } = calculateSunglassesPosition(
            face[0].keypoints,
          );

          ctx.drawImage(image, x, y, width, height);
        }
        requestAnimationFrame(() => estimateFacesLoop(model, image, ctx));
      });
    },
    [trackRef],
  );

  useEffect(() => {
    loadImageAndSetupCanvas();
  }, [loadImageAndSetupCanvas]);

  useEffect(() => {
    if (!image || !canvasContext) return;
    // 인식 모델 로드
    loadFaceLandmarker().then((model) => {
      requestAnimationFrame(() =>
        estimateFacesLoop(model, image, canvasContext),
      );
    });
  }, [image, canvasContext, estimateFacesLoop]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 -scale-x-100 bg-none"
      />
      <canvas
        ref={trackCanvasRef}
        className="absolute left-0 top-0 opacity-0"
      />
      <p className="absolute -top-4 left-2">{status}</p>
    </>
  );
}

export default FaceFilter;
