import { useParams } from 'react-router-dom';
import { useGetVoiceChallenge } from '../../apis/challenge/getVoiceChallenge';
import { usePostVoiceChallenge } from '../../apis/challenge/postVoiceChallenge';
import { SYS_MESSAGE } from '../../constants/message';
import { formatDate } from '../../utils/formatter';
import ChallengeHeader from '../qa-challenge/ChallengeHeader';
import VoiceAnswerEditor from './VoiceAnswerEditor';
import VoiceAnswerField from './VoiceAnswerField';

const VoiceChallengeContainer = () => {
  const { challengeId } = useParams();
  const { myAnswer, answerList, challengeInfo, hasData, isLoading } =
    useGetVoiceChallenge({
      challengeId,
    });

  const { mutate } = usePostVoiceChallenge();

  const mutateVoiceForm = (fileData: File | null) => {
    const formData = new FormData();

    if (challengeId) formData.append('challengeId', challengeId);
    if (fileData) formData.append('answer', fileData);

    mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!hasData || !myAnswer || !challengeInfo)
    return <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div>
      <div className="flex h-full w-full flex-col gap-16">
        <ChallengeHeader
          challengeNumber={challengeInfo.challengeNumber}
          challengeDate={formatDate(challengeInfo.challengeDate)}
          challengeTitle={challengeInfo.challengeTitle}
        />
        <div className="flex flex-col gap-12">
          <VoiceAnswerEditor
            key={myAnswer.userId}
            role={myAnswer.role}
            userImg={myAnswer.userImg}
            answer={myAnswer.answer}
            question={challengeInfo.challengeTitle}
            mutate={mutateVoiceForm}
          />
          {answerList.map((answer) => (
            <VoiceAnswerField
              key={answer.userId}
              canView={challengeInfo.isComplete}
              {...answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceChallengeContainer;
