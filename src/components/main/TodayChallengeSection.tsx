import { useGetTodayChallenge } from '../../apis/challenge/getTodayChallenge';
import ChallengeButton from './ChallengeButton';

const TodayChallengeSection = () => {
  const {
    data: { challengeInfo },
  } = useGetTodayChallenge();

  if (!challengeInfo)
    return <ChallengeButton type="active" text="챌린지 시작" />;
  return (
    <ChallengeButton
      type="ongoing"
      challengeId={challengeInfo.challengeId}
      text={challengeInfo.challengeTitle}
      day={challengeInfo.challengeNumber}
      theme={challengeInfo.challengeType}
    />
  );
};

export default TodayChallengeSection;
