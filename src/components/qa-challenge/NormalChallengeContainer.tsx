import { useParams } from 'react-router-dom';
import { useGetNormalChallenge } from '../../apis/challenge/getNormalChallenge';
import { formatDate } from '../../utils/formatter';
import AnswerEditor from './AnswerEditor';
import AnswerField from './AnswerField';
import ChallengeHeader from './ChallengeHeader';

const NormalChallengeContainer = () => {
  const { challengeId } = useParams();
  const { myAnswer, answerList, challengeInfo, hasData, isLoading } =
    useGetNormalChallenge({
      challengeId: challengeId,
    });
  if (isLoading) return <div>Loading...</div>;
  if (!hasData || !myAnswer || !challengeInfo)
    return <div>데이터가 존재하지 않습니다.</div>;
  return (
    <div className="flex h-full w-full flex-col gap-16">
      <ChallengeHeader
        challengeNumber={challengeInfo.challengeNumber}
        challengeDate={formatDate(challengeInfo.challengeDate)}
        challengeTitle={challengeInfo.challengeTitle}
      />
      <div className="flex flex-col gap-12">
        <AnswerEditor
          role={myAnswer.role}
          key={myAnswer.userId}
          userImg={myAnswer.userImg}
          answer={myAnswer.answer}
        />
        {answerList.map((answer) => (
          <AnswerField
            key={answer.userId}
            canView={challengeInfo.isCompleted}
            {...answer}
          />
        ))}
      </div>
    </div>
  );
};

export default NormalChallengeContainer;
