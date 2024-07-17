import { useParams } from 'react-router-dom';
import { useGetNormalChallenge } from '../../apis/challenge/getNormalChallenge';
import { usePostNormalChallenge } from '../../apis/challenge/postNormalChallenge';
import { SYS_MESSAGE } from '../../constants/message';
import { formatDate } from '../../utils/formatter';
import ChallengeHeader from './ChallengeHeader';
import TextAnswerEditor from './TextAnswerEditor';
import TextAnswerField from './TextAnswerField';

const NormalChallengeContainer = () => {
  const { challengeId } = useParams();
  const { myAnswer, answerList, challengeInfo, hasData, isLoading } =
    useGetNormalChallenge({
      challengeId: challengeId,
    });
  const { mutate } = usePostNormalChallenge({
    challengeId: challengeId || '',
  });
  if (isLoading) return <div>Loading...</div>;
  if (!hasData || !myAnswer || !challengeInfo)
    return <div>{SYS_MESSAGE.NO_DATA}</div>;
  return (
    <div className="flex h-full w-full flex-col gap-16">
      <ChallengeHeader
        challengeNumber={challengeInfo.challengeNumber}
        challengeDate={formatDate(challengeInfo.challengeDate)}
        challengeTitle={challengeInfo.challengeTitle}
      />
      <div className="flex flex-col gap-12">
        <TextAnswerEditor
          role={myAnswer.role}
          key={myAnswer.userId}
          userImg={myAnswer.userImg}
          answer={myAnswer.answer}
          mutate={mutate}
        />
        {answerList.map((answer) => (
          <TextAnswerField
            key={answer.userId}
            canView={challengeInfo.isComplete}
            {...answer}
          />
        ))}
      </div>
    </div>
  );
};

export default NormalChallengeContainer;
