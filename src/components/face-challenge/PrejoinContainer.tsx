import { useState } from 'react';
import { FilterType } from '../../types/challenge';
import Button from '../common/Button';
import Header from '../common/Header';
import ChallengeHeader from '../qa-challenge/ChallengeHeader';
import FilterSelector from './FilterSelector';
import PrejoinCam from './PrejoinFaceFilter';

interface PrejoinContainerProps {
  setIsJoined: (isJoined: boolean) => void;
}

const PrejoinContainer = ({ setIsJoined }: PrejoinContainerProps) => {
  const [filterType, setFilterType] = useState<FilterType>('none');
  const challengeTitle = 'FaceTime Challenge';
  const challengeNumber = '1';
  const challengeDate = '18237492378';

  return (
    <>
      <Header />
      <div className="flex h-full flex-col justify-between">
        <ChallengeHeader
          challengeTitle={challengeTitle}
          challengeNumber={challengeNumber}
          challengeDate={challengeDate}
        />
        <PrejoinCam filterType={filterType} />
        <FilterSelector
          filterType={filterType}
          setFilterType={(filterType) => setFilterType(filterType)}
        />
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
