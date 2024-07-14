import { useGetTodayChallenge } from '../../apis/challenge/getTodayChallenge';
import { useGetLucky } from '../../apis/lucky/getLucky';
import { usePostLuckyBubble } from '../../apis/lucky/postLuckyBubble';
import { MAX_FAMILY_MEMBER } from '../../constants/family';
import ChallengeButton from './ChallengeButton';
import Lucky from './Lucky';

interface ChallengeSectionProps {
  currentFamilySize: number;
}

const ChallengeSection = ({ currentFamilySize }: ChallengeSectionProps) => {
  const {
    challengeInfo,
    isDone,
    isLoading: challengeLoading,
  } = useGetTodayChallenge({
    enabled: currentFamilySize === MAX_FAMILY_MEMBER,
  });
  const { luckyInfo, isLoading: luckyLoading } = useGetLucky();
  const { mutate } = usePostLuckyBubble();

  const handleLuckyBubble = () => {
    mutate();
  };

  if (challengeLoading || luckyLoading)
    return <div>메인 화면 정보 Loading...</div>;

  const renderContent = () => {
    if (currentFamilySize < MAX_FAMILY_MEMBER)
      return (
        <>
          <ChallengeButton
            type="disabled"
            text="챌린지 시작"
            currentSize={currentFamilySize}
            familySize={MAX_FAMILY_MEMBER}
          />
        </>
      );
    if (!challengeInfo || isDone)
      return (
        <>
          <Lucky level={1} />
          <ChallengeButton type="active" text="챌린지 시작" />
        </>
      );
    return (
      <>
        <div className="flex flex-col items-center">
          {luckyInfo.isBubble && (
            <div className="h-10 w-10 bg-red" onClick={handleLuckyBubble}></div>
          )}
          <Lucky level={luckyInfo.luckyStatus} />
        </div>
        <ChallengeButton
          type="ongoing"
          challengeId={challengeInfo.challengeId}
          text={challengeInfo.challengeTitle}
          day={challengeInfo.challengeNumber}
          theme={challengeInfo.challengeType}
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
