import AnswerField from './AnswerField';
import ChallengeHeader from './ChallengeHeader';

const NormalChallengeContainer = () => {
  return (
    <div className="flex h-full w-full flex-col gap-16">
      <ChallengeHeader
        challengeNumber="1"
        challengeDate="2021.09.01"
        challengeTitle="가족에게 미안했지만, 사과하지 못한 순간이 있나요?"
      />
      <div className="flex flex-col gap-12">
        <AnswerField />
        <AnswerField />
        <AnswerField />
        <AnswerField />
      </div>
    </div>
  );
};

export default NormalChallengeContainer;
