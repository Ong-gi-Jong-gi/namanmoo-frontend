import { useParams } from 'react-router-dom';
import { useGetFaceChallenge } from '../../apis/challenge/getFaceChallenge';
import FaceChallengeContent from './FaceChallengeContent';
import FaceChallengeResult from './result/FaceChallengeResult';

const FaceChallengeContainer = () => {
  const { challengeId } = useParams();
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
        <FaceChallengeContent challengeInfo={challengeInfo} code={code} />
      )}
    </>
  );
};

export default FaceChallengeContainer;
