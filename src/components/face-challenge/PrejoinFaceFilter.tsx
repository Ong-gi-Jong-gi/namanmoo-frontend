import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { calculateSunglassesPosition } from '../../utils/calculateFilterPosition';
import { loadFaceLandmarker } from '../../utils/loadModel';

const videoSize = {
  width: 640,
  height: 480,
};

const PrejoinCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialLoadedRef = useRef(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const loadImageAndSetupCanvas = useCallback(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!canvasContext || initialLoadedRef.current) return;

    initialLoadedRef.current = true;
    const image = new Image();
    image.src = 'src/assets/filter/sunglasses.png';

    image.onload = () => {
      setImage(image);
    };

    setCanvasContext(canvasContext);
  }, [setImage, setCanvasContext]);

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
      console.log('actualWidth', actualWidth);

      const scaleX = actualWidth / videoSize.width;
      const scaleY = actualHeight / videoSize.height;

      model.estimateFaces(video).then((face) => {
        // 캔버스 초기화
        ctx.clearRect(0, 0, actualWidth, actualHeight);

        if (face[0]) {
          canvasRef.current!.width = actualWidth;
          canvasRef.current!.height = actualHeight;
          const { x, y, width, height } = calculateSunglassesPosition(
            face[0].keypoints,
          );

          const widthScaled = width * scaleX;
          const heightScaled = height * scaleY;
          const xScaled = x * scaleX;
          const yScaled = y * scaleY;

          ctx.drawImage(image, xScaled, yScaled, widthScaled, heightScaled);
        }

        // 재귀 호출
        requestAnimationFrame(() => {
          estimateFacesLoop(model, image, ctx);
        });
      });
    },
    [],
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
    <div className="relative h-fit w-fit">
      <Webcam
        width={videoSize.width}
        height={videoSize.height}
        ref={webcamRef}
      />
      <canvas className="absolute left-0 top-0" ref={canvasRef} />
    </div>
  );
};

export default PrejoinCam;
