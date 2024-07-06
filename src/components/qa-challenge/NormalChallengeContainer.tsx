import { useParams } from 'react-router-dom';
import { useGetNormalChallenge } from '../../apis/challenge/getNormalChallenge';
import { separateMyAnswer } from '../../utils/separator';
import AnswerEditor from './AnswerEditor';
import AnswerField from './AnswerField';
import ChallengeHeader from './ChallengeHeader';

const NormalChallengeContainer = () => {
  const { challengeId } = useParams();
  const { data, isLoading } = useGetNormalChallenge({
    challengeId: challengeId || '',
  });
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>답변 조회 실패</div>;
  const { myAnswer, members: answerList } = separateMyAnswer(data.answerList);
  if (!myAnswer) return <div>내 정보가 존재하지 않습니다.</div>;
  return (
    <div className="flex h-full w-full flex-col gap-16">
      <ChallengeHeader
        challengeNumber={data.challengeInfo.challengeNumber}
        challengeDate={data.challengeInfo.challengeDate}
        challengeTitle={data.challengeInfo.challengeTitle}
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
            canView={myAnswer.answer !== null}
            {...answer}
          />
        ))}
      </div>
    </div>
  );
};

export default NormalChallengeContainer;
