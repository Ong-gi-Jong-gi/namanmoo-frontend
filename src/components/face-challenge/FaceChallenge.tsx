import { useState } from 'react';
import FacetimeContainer from './FacetimeContainer';
import PrejoinContainer from './PrejoinContainer';

const FaceChallenge = () => {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="flex h-full w-full flex-col">
      {isJoined ? (
        <FacetimeContainer />
      ) : (
        <>
          <PrejoinContainer setIsJoined={(isJoined) => setIsJoined(isJoined)} />
        </>
      )}
    </div>
  );
};

export default FaceChallenge;
