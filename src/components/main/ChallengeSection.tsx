import { useGetTodayChallenge } from '../../apis/challenge/getTodayChallenge';
import { MAX_FAMILY_MEMBER } from '../../constants/family';
import ChallengeButton from './ChallengeButton';
import Lucky from './Lucky';

interface ChallengeSectionProps {
  currentFamilySize: number;
}

const ChallengeSection = ({ currentFamilySize }: ChallengeSectionProps) => {
  const { data: challengeInfo, isLoading } = useGetTodayChallenge({
    enabled: currentFamilySize === MAX_FAMILY_MEMBER,
    challengeDate: `2024-09-01`,
  });
  if (isLoading) return <div>챌린지 정보 Loading...</div>;

  const renderContent = () => {
    if (currentFamilySize < MAX_FAMILY_MEMBER)
      return (
        <>
          <Lucky level={1} />
          <ChallengeButton
            type="disabled"
            text="챌린지 시작"
            currentSize={currentFamilySize}
            familySize={MAX_FAMILY_MEMBER}
          />
        </>
      );
    if (!challengeInfo)
      return (
        <>
          <Lucky level={1} />
          <ChallengeButton type="active" text="챌린지 시작" />
        </>
      );
    return (
      <>
        <Lucky level={3} />
        <ChallengeButton
          type="ongoing"
          challengeId={challengeInfo.challengeId}
          text={challengeInfo.challengeTitle}
          day={challengeInfo.challengeNumber}
        />
      </>
    );
  };

  return (
    <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
      {renderContent()}
    </div>
  );
};

export default ChallengeSection;
