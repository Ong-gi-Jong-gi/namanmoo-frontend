import { useParams } from 'react-router-dom';
import { useGetNormalChallenge } from '../../apis/challenge/getNormalChallenge';
import { separateMyAnswer } from '../../utils/separator';
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
  if (!myAnswer) return <div>내 답변이 없습니다.</div>;
  return (
    <div className="flex h-full w-full flex-col gap-16">
      <ChallengeHeader
        challengeNumber="1"
        challengeDate="2021.09.01"
        challengeTitle="가족에게 미안했지만, 사과하지 못한 순간이 있나요?"
      />
      <div className="flex flex-col gap-12">
        <AnswerField
          nickname="나"
          role={myAnswer.role}
          key={myAnswer.userId}
          userImg={myAnswer.userImg}
          answer={myAnswer.answer}
        />
        {answerList.map((answer) => (
          <AnswerField key={answer.userId} {...answer} />
        ))}
      </div>
    </div>
  );
};

export default NormalChallengeContainer;
