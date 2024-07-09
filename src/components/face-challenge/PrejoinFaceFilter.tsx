import Webcam from 'react-webcam';

const PrejoinFaceFilter = () => {
  return (
    <div className="relative">
      <Webcam />
      <canvas className="absolute left-0 top-0" />
    </div>
  );
};

export default PrejoinFaceFilter;
