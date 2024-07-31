import { useState } from 'react';
import { ChallengeDetailDto } from '../../apis/dtos/challengeDtos';
import FacetimeContainer from './facetime/FacetimeContainer';
import PrejoinContainer from './prejoin/PrejoinContainer';
import FaceLandmark from './utils/FaceLandmark';

interface FaceChallengeContentProps {
  challengeInfo: ChallengeDetailDto;
  code: string;
}

const FaceChallengeContent = ({
  challengeInfo,
  code,
}: FaceChallengeContentProps) => {
  const [isJoined, setIsJoined] = useState(false);
  return (
    <FaceLandmark code={code}>
      {isJoined ? (
        <FacetimeContainer code={code} />
      ) : (
        <>
          <PrejoinContainer
            setIsJoined={(isJoined) => setIsJoined(isJoined)}
            challengeInfo={challengeInfo}
            code={code}
          />
        </>
      )}
    </FaceLandmark>
  );
};
export default FaceChallengeContent;
