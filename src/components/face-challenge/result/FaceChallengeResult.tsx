import { useParams } from 'react-router-dom';
import { useGetFaceChallengeResult } from '../../../apis/challenge/getFaceChallengeResult';
import { formatDate } from '../../../utils/formatter';
import ChallengeHeader from '../../qa-challenge/ChallengeHeader';
import FaceAnswerField from './FaceAnswerField';

const FaceChallengeResult = () => {
  const { challengeId } = useParams();
  const { data, isLoading } = useGetFaceChallengeResult({ challengeId });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  const { challengeInfo, answerList } = data;

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-16">
      <div>
        <ChallengeHeader
          challengeNumber={challengeInfo.challengeNumber}
          challengeDate={formatDate(challengeInfo.challengeDate)}
          challengeTitle={challengeInfo.challengeTitle}
        />
        <p className="text-md text-gray-0 font-ryurue">
          가로 스크롤을 통해 가족들의 사진을 구경하세요!
        </p>
      </div>
      <div className="w-full flex-1 overflow-scroll scrollbar-hide">
        <div className="flex h-full w-[400%] gap-4 px-2">
          {answerList.map((answer) => (
            <FaceAnswerField key={answer} imageUrl={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaceChallengeResult;
