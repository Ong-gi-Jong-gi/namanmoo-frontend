import { useEffect, useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import FacetimeContainer from '../components/face-challenge/FacetimeContainer';
import PrejoinFaceFilter from '../components/face-challenge/PrejoinFaceFilter';
import useFaceLandmarkerStore from '../store/faceLandmarkerStore';
import { loadFaceLandmarker } from '../utils/loadModel';

const VideoTestPage = () => {
  return (
    <div className="h-full w-full">
      <LivekitRoom />
    </div>
  );
};

const LivekitRoom = () => {
  const { setFaceLandmarker } = useFaceLandmarkerStore();
  const [name, setName] = useState('');
  const [isEntrance, setIsEntrance] = useState(false);

  useEffect(() => {
    loadFaceLandmarker().then((model) => {
      setFaceLandmarker(model);
    });
  }, [setFaceLandmarker]);

  const handleClick = () => {
    localStorage.setItem('lkName', name);
    setIsEntrance(true);
  };
  return (
    <>
      {isEntrance ? (
        <>
          <FacetimeContainer />
        </>
      ) : (
        <>
          <PrejoinFaceFilter />
          <Input
            label="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button label="입장!" onClick={handleClick} />
        </>
      )}
    </>
  );
};

export default VideoTestPage;
