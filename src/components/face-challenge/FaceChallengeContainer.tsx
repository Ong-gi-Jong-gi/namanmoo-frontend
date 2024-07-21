import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFaceChallenge } from '../../apis/challenge/getFaceChallenge';
import FacetimeContainer from './facetime/FacetimeContainer';
import PrejoinContainer from './prejoin/PrejoinContainer';
import FaceChallengeResult from './result/FaceChallengeResult';
import FaceLandmark from './utils/FaceLandmark';

const FaceChallengeContainer = () => {
  const { challengeId } = useParams();

  const [isJoined, setIsJoined] = useState(false);
  const { data } = useGetFaceChallenge({
    challengeId: challengeId || '',
  });

  if (!data) return <div>Challenge not found</div>;

  const { challengeInfo, code } = data;

  return (
    <>
      {challengeInfo.isComplete ? (
        <FaceChallengeResult challengeInfo={challengeInfo} />
      ) : (
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
      )}
    </>
  );
};

export default FaceChallengeContainer;
