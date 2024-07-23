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
      <div>
        <ChallengeHeader
          challengeNumber={challengeInfo.challengeNumber}
          challengeDate={formatDate(challengeInfo.challengeDate)}
          challengeTitle={challengeInfo.challengeTitle}
        />
        <p className="text-gray-0 text-ryurue-xs font-ryurue">
          가로 스크롤을 통해 가족들의 사진을 구경하세요!
        </p>
      </div>
      <div className="w-full flex-1 overflow-scroll scrollbar-hide">
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
