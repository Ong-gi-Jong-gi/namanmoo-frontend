import { ChallengeDetailDto } from '../../apis/dtos/challengeDtos';
import Button from '../common/Button';
import Header from '../common/Header';
import ChallengeHeader from '../qa-challenge/ChallengeHeader';
import FilterSelector from './FilterSelector';
import MemoizedPrejoinCam from './PrejoinCam';

interface PrejoinContainerProps {
  challengeInfo: ChallengeDetailDto;
  setIsJoined: (isJoined: boolean) => void;
}

const PrejoinContainer = ({
  setIsJoined,
  challengeInfo,
}: PrejoinContainerProps) => {
  const { challengeTitle, challengeNumber, challengeDate } = challengeInfo;

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
        <Button
          label="시작하기"
          onClick={() => setIsJoined(true)}
          type="full"
        />
      </div>
    </>
  );
};

export default PrejoinContainer;
