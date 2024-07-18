import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetFaceChallenge } from '../../apis/challenge/getFaceChallenge';
import { useFacetimeChallengeStore } from '../../store/facetimeChallengeStore';
import FacetimeContainer from './facetime/FacetimeContainer';
import PrejoinContainer from './prejoin/PrejoinContainer';
import FaceChallengeResult from './result/FaceChallengeResult';
import FaceLandmark from './utils/FaceLandmark';

const FaceChallengeContainer = () => {
  const { challengeId } = useParams();
  const { setSocket } = useFacetimeChallengeStore();
  const [isJoined, setIsJoined] = useState(false);
  const { data, isLoading } = useGetFaceChallenge({
    challengeId: challengeId || '',
  });

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_NODE_API_URL);
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [setSocket]);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Challenge not found</div>;

  const { challengeInfo, code } = data;

  return (
    <>
      {challengeInfo.isComplete ? (
        <FaceChallengeResult challengeInfo={challengeInfo} />
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
    </>
  );
};

export default FaceChallengeContainer;
