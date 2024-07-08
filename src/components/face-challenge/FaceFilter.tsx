import { type FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { calculateSunglassesPosition } from '../../utils/calculateFilterPosition';
import { loadFaceLandmarker } from '../../utils/loadModel';

const videoSize = {
  width: 640,
  height: 480,
};

function FaceFilter() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialLoadedRef = useRef<boolean>(false);
  const [status, setStatus] = useState<
    'Initializing...' | 'Load Model...' | 'Model Loaded'
  >('Initializing...');

  const estimateFacesLoop = useCallback(
    (
      model: FaceLandmarksDetector,
      image: HTMLImageElement,
      ctx: CanvasRenderingContext2D,
    ) => {
      const video = webcamRef.current?.video;

      if (!video) return;

      const actualWidth = video.getBoundingClientRect().width;
      const actualHeight = video.getBoundingClientRect().height;

      model.estimateFaces(video).then((face) => {
        canvasRef.current!.width = actualWidth;
        canvasRef.current!.height = actualHeight;

        const scale = actualWidth / videoSize.width;
        ctx.clearRect(0, 0, actualWidth, actualHeight);
        if (face[0]) {
          const { x, y, width, height } = calculateSunglassesPosition(
            face[0].keypoints,
          );
          const scaledX = x * scale;
          const scaledY = y * scale;
          const scaledWidth = width * scale;
          const scaledHeight = height * scale;

          ctx.drawImage(image, scaledX, scaledY, scaledWidth, scaledHeight);
        }
        requestAnimationFrame(() => estimateFacesLoop(model, image, ctx));
      });
    },
    [],
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
    <main>
      <div className="relative">
        <Webcam
          className="-scale-x-100"
          width={videoSize.width}
          height={videoSize.height}
          ref={webcamRef}
        />
        <canvas
          ref={canvasRef}
          className="absolute left-0 top-0 -scale-x-100 bg-none"
        />
      </div>
      <p className="status">{status}</p>
    </main>
  );
}

export default FaceFilter;
