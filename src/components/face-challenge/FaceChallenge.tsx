import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFaceChallenge } from '../../apis/challenge/getFaceChallenge';
import FaceLandmark from './FaceLandmark';
import FacetimeContainer from './facetime/FacetimeContainer';
import PrejoinContainer from './prejoin/PrejoinContainer';

const FaceChallenge = () => {
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
    </div>
  );
};

export default FaceChallenge;
