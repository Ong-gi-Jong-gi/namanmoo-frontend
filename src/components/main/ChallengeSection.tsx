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
  });

  if (currentFamilySize < MAX_FAMILY_MEMBER)
    return (
      <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
        <Lucky level={1} />
        <ChallengeButton
          type="disabled"
          text="챌린지 시작"
          currentSize={currentFamilySize}
          familySize={MAX_FAMILY_MEMBER}
        />
      </div>
    );
  if (isLoading) return <div>챌린지 정보 Loading...</div>;
  if (challengeInfo === null)
    return (
      <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
        <Lucky level={1} />
        <ChallengeButton type="active" text="챌린지 시작" />
      </div>
    );
  if (!challengeInfo) return <div>챌린지 정보가 없습니다.</div>;

  return (
    <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
      <Lucky level={3} />
      <ChallengeButton
        type="ongoing"
        text={challengeInfo.challengeTitle}
        day={challengeInfo.challengeNumber}
      />
    </div>
  );
};

export default ChallengeSection;
