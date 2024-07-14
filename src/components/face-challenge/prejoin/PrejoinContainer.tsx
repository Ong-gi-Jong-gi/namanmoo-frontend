import { ChallengeDetailDto } from '../../../apis/dtos/challengeDtos';
import useSocket from '../../../hooks/useSocket';
import Button from '../../common/Button';
import Header from '../../common/Header';
import ChallengeHeader from '../../qa-challenge/ChallengeHeader';
import FilterSelector from '../FilterSelector';
import MemoizedPrejoinCam from './PrejoinCam';

interface PrejoinContainerProps {
  challengeInfo: ChallengeDetailDto;
  setIsJoined: (isJoined: boolean) => void;
  code: string;
}

const PrejoinContainer = ({
  setIsJoined,
  challengeInfo,
  code,
}: PrejoinContainerProps) => {
  const { emitJoin } = useSocket();
  const { challengeTitle, challengeNumber, challengeDate } = challengeInfo;

  const handleJoin = () => {
    setIsJoined(true);
    emitJoin(code);
  };

  return (
    <>
      <Header />
      <div className="flex h-full flex-col justify-between">
        <ChallengeHeader
          challengeTitle={challengeTitle}
          challengeNumber={challengeNumber}
          challengeDate={challengeDate}
        />
        <MemoizedPrejoinCam />
        <FilterSelector />
        <Button label="시작하기" onClick={handleJoin} type="full" />
      </div>
    </>
  );
};

export default PrejoinContainer;
