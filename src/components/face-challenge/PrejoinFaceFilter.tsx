import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { calculateSunglassesPosition } from '../../utils/calculateFilterPosition';

const PrejoinFaceFilter = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const loadImageAndSetupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;

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
      if (!webcamRef.current) return;
      const video = webcamRef.current.video;

      if (!video) return;
      const actualWidth = video.getBoundingClientRect().width;
      const actualHeight = video.getBoundingClientRect().height;

      canvasRef.current!.width = actualWidth;
      canvasRef.current!.height = actualHeight;

      model.estimateFaces(video).then((face) => {
        canvasRef.current!.width = actualWidth;
        canvasRef.current!.height = actualHeight;

        ctx.clearRect(0, 0, actualWidth, actualHeight);
        if (face[0]) {
          const { x, y, width, height, angle } = calculateSunglassesPosition(
            face[0].keypoints,
          );

          ctx.translate(x + width / 2, y + height / 2);
          ctx.rotate((angle * Math.PI) / 180);
          ctx.drawImage(image, -width / 2, -height / 2, width, height);
          ctx.rotate((-angle * Math.PI) / 180);
          ctx.translate(-(x + width / 2), -(y + height / 2));
        }
        requestAnimationFrame(() => estimateFacesLoop(model, image, ctx));
      });
    },
    [],
  );

  useEffect(() => {
    loadImageAndSetupCanvas();
  }, [loadImageAndSetupCanvas]);

  return (
    <div className="relative">
      <Webcam ref={webcamRef} />
      <canvas ref={canvasRef} className="absolute left-0 top-0" />
    </div>
  );
};

export default PrejoinFaceFilter;
