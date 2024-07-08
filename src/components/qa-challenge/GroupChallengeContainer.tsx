import { useParams } from 'react-router-dom';
import { useGetGroupChallenge } from '../../apis/challenge/getGroupChallenge';
import { SYS_MESSAGE } from '../../constants/message';
import { formatDate } from '../../utils/formatter';
import ChallengeHeader from './ChallengeHeader';
import TextAnswerEditor from './TextAnswerEditor';
import TextAnswerField from './TextAnswerField';

const GroupChallengeContainer = () => {
  const { challengeId } = useParams();
  const {
    challengeInfo,
    firstAnswer,
    firstAnswerList,
    firstQuestions,
    secondAnswerList,
    secondQuestions,
    isLoading,
    hasData,
  } = useGetGroupChallenge({
    challengeId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (
    !hasData ||
    !firstAnswer ||
    !firstAnswerList ||
    !firstQuestions ||
    !secondAnswerList ||
    !secondQuestions ||
    !challengeInfo
  )
    return <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full w-full flex-col gap-16">
      <ChallengeHeader
        challengeNumber={challengeInfo.challengeNumber}
        challengeDate={formatDate(challengeInfo.challengeDate)}
        challengeTitle={firstQuestions}
      />
      <div className="flex flex-col gap-12">
        <TextAnswerEditor
          role={firstAnswer.role}
          key={firstAnswer.userId}
          userImg={firstAnswer.userImg}
          answer={firstAnswer.answer}
        />
        {firstAnswerList.map((answer) => (
          <TextAnswerField
            key={answer.userId}
            canView={challengeInfo.isCompleted}
            {...answer}
          />
        ))}
      </div>

      <ChallengeHeader challengeTitle={secondQuestions} />
      <div className="flex flex-col gap-12">
        {secondAnswerList.map((answer) => (
          <TextAnswerField
            key={answer.userId}
            canView={challengeInfo.isCompleted}
            {...answer}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupChallengeContainer;
