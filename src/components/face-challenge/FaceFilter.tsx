import { useTrackRefContext } from '@livekit/components-react';
import { type FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { useCallback, useEffect, useRef, useState } from 'react';
import { calculateSunglassesPosition } from '../../utils/calculateFilterPosition';
import { loadFaceLandmarker } from '../../utils/loadModel';

const videoSize = {
  width: 640,
  height: 480,
};

function FaceFilter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialLoadedRef = useRef<boolean>(false);
  const [status, setStatus] = useState<
    'Initializing...' | 'Load Model...' | 'Model Loaded'
  >('Initializing...');
  const trackRef = useTrackRefContext();
  const trackCanvasRef = useRef<HTMLCanvasElement>(null);

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

      model.estimateFaces(trackImageData).then((face) => {
        canvasRef.current!.width = actualWidth;
        canvasRef.current!.height = actualHeight;

        const scale = actualWidth / videoSize.width;
        ctx.clearRect(0, 0, actualWidth, actualHeight);
        if (face[0]) {
          const { x, y, width, height } = calculateSunglassesPosition(
            face[0].keypoints,
          );
          const scaledWidth = width * scale;
          const scaledHeight = height * scale;
          const scaledX = x + scaledWidth / 2;
          const scaledY = y;

          ctx.drawImage(image, scaledX, scaledY, scaledWidth, scaledHeight);
        }
        requestAnimationFrame(() => estimateFacesLoop(model, image, ctx));
      });
    },
    [trackRef],
  );

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');

    if (!canvasContext || initialLoadedRef.current) return;

    initialLoadedRef.current = true;

    const image = new Image();
    image.src = 'src/assets/filter/sunglasses.png';

    setStatus('Load Model...');

    loadFaceLandmarker().then((model) => {
      setStatus('Model Loaded');
      requestAnimationFrame(() =>
        estimateFacesLoop(model, image, canvasContext),
      );
    });
  }, [estimateFacesLoop]);

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
      <p className="absolute -bottom-4 left-2">{status}</p>
    </>
  );
}

export default FaceFilter;
