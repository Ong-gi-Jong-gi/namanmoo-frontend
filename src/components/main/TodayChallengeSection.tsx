import { useGetTodayChallenge } from '../../apis/challenge/getTodayChallenge';
import { MAX_FAMILY_MEMBER } from '../../constants/family';
import ChallengeButton from './ChallengeButton';

interface TodayChallengeSectionProps {
  currentFamilySize: number;
}

const TodayChallengeSection = ({
  currentFamilySize,
}: TodayChallengeSectionProps) => {
  const isFamilyFull = currentFamilySize === MAX_FAMILY_MEMBER;
  const { data, isLoading } = useGetTodayChallenge({ enabled: isFamilyFull });

  if (!isFamilyFull)
    return (
      <ChallengeButton
        type="disabled"
        text="챌린지 시작"
        currentSize={currentFamilySize}
        familySize={MAX_FAMILY_MEMBER}
      />
    );
  if (!data && isLoading) return <div>Loading...</div>;
  if (!data?.challengeInfo)
    return <ChallengeButton type="active" text="챌린지 시작" />;
  const { challengeInfo } = data;

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
