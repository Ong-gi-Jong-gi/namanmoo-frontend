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
  const { data, isLoading } = useGetFaceChallenge({
    challengeId: challengeId || '',
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Challenge not found</div>;

  const { challengeInfo, code } = data;

  return (
    <div className="flex h-full w-full flex-col">
      {challengeInfo.isComplete ? (
        <FaceChallengeResult />
      ) : (
        <FaceLandmark>
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
    </div>
  );
};

export default FaceChallengeContainer;
