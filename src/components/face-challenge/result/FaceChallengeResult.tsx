import { useParams } from 'react-router-dom';
import { useGetFaceChallengeResult } from '../../../apis/challenge/getFaceChallengeResult';
import { ChallengeDetailDto } from '../../../apis/dtos/challengeDtos';
import { formatDate } from '../../../utils/formatter';
import ChallengeHeader from '../../qa-challenge/ChallengeHeader';
import FaceAnswerField from './FaceAnswerField';

interface FaceChallengeResultProps {
  challengeInfo: ChallengeDetailDto;
}

const FaceChallengeResult = ({ challengeInfo }: FaceChallengeResultProps) => {
  const { challengeId } = useParams();
  const { data } = useGetFaceChallengeResult({ challengeId });
  if (!data) return <div>No data</div>;

  const { answerList } = data;

  return (
    <div className="flex h-full w-full flex-1 flex-col justify-between">
      <ChallengeHeader
        challengeNumber={challengeInfo.challengeNumber}
        challengeDate={formatDate(challengeInfo.challengeDate)}
        challengeTitle={challengeInfo.challengeTitle}
      />
      <div className="w-full flex-1 overflow-scroll py-2 scrollbar-hide">
        <div
          className="grid h-full items-center gap-4 px-2"
          style={{
            width: `${answerList.length * 100}%`,
            gridTemplateColumns: `repeat(${answerList.length}, 1fr)`,
          }}
        >
          {answerList.map((answer) => (
            <FaceAnswerField key={answer} imageUrl={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceChallengeResult;
