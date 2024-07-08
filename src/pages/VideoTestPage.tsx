import { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import FaceFilter from '../components/face-challenge/FaceFilter';
import Test from '../components/face-challenge/Test';

type Status = 'Livekit' | 'Face';

const VideoTestPage = () => {
  const [status, setStatus] = useState<Status>('Livekit');
  return (
    <div>
      <Button label="Livekit" onClick={() => setStatus('Livekit')} />
      <Button label="Face" onClick={() => setStatus('Face')} />
      {status === 'Livekit' ? <LivekitRoom /> : <FaceFilter />}
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
          <Test />
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
