import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFaceChallenge } from '../../apis/challenge/getFaceChallenge';
import FacetimeContainer from './FacetimeContainer';
import PrejoinContainer from './PrejoinContainer';

const FaceChallenge = () => {
  const { challengeId } = useParams();
  const [isJoined, setIsJoined] = useState(false);
  const { data, isLoading } = useGetFaceChallenge({
    challengeId: challengeId || '',
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Challenge not found</div>;
  console.log(data);

  const { challengeInfo, code } = data;

  return (
    <div className="flex h-full w-full flex-col">
      {isJoined ? (
        <FacetimeContainer code={code} />
      ) : (
        <>
          <PrejoinContainer
            setIsJoined={(isJoined) => setIsJoined(isJoined)}
            challengeInfo={challengeInfo}
          />
        </>
      )}
    </div>
  );
};

export default FaceChallenge;
