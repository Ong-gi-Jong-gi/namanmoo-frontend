import { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import FacetimeContainer from '../components/face-challenge/FacetimeContainer';

const VideoTestPage = () => {
  return (
    <div className="h-full w-full">
      <LivekitRoom />
    </div>
  );
};

const LivekitRoom = () => {
  const [name, setName] = useState('');
  const [isEntrance, setIsEntrance] = useState(false);
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
