import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import useFaceFilterWithModel from '../../hooks/useFaceFilterWithModel';

const PrejoinCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );
  const { canvasRef } = useFaceFilterWithModel(videoElement, true);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      setVideoElement(webcamRef.current.video);
    }
  }, [webcamRef]);

  return (
    <div className="relative -scale-x-100">
      <Webcam ref={webcamRef} className="m-auto" />
      <canvas className="absolute left-0 top-0" ref={canvasRef} />
    </div>
  );
};

export default PrejoinCam;
