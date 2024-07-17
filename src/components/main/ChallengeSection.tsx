import { useGetTodayChallenge } from '../../apis/challenge/getTodayChallenge';
import { useGetLucky } from '../../apis/lucky/getLucky';
import { usePostLuckyBubble } from '../../apis/lucky/postLuckyBubble';
import balloon from '../../assets/lucky/balloon.svg';
import { MAX_FAMILY_MEMBER } from '../../constants/family';
import { getRandomMessage } from '../../utils/luckyMessage';
import ChallengeButton from './ChallengeButton';
import Lucky from './Lucky';
import RiveLucky from './RiveLucky';

interface ChallengeSectionProps {
  currentFamilySize: number;
}

const ChallengeSection = ({ currentFamilySize }: ChallengeSectionProps) => {
  const { challengeInfo, isLoading: challengeLoading } = useGetTodayChallenge({
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
          <Lucky level={0} />
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
          <Lucky level={0} />
          <ChallengeButton type="active" text="챌린지 시작" />
        </>
      );
    return (
      <>
        <div className="flex flex-col items-center">
          {luckyInfo.isBubble && (
            <div className="relative right-4" onClick={handleLuckyBubble}>
              <img src={balloon} alt="balloon" />
              <p className="absolute left-1/2 top-[47%] w-full -translate-x-1/2 -translate-y-1/2 transform text-center font-ryurue text-ryurue-base">
                {getRandomMessage()}
              </p>
            </div>
          )}
          <RiveLucky
            level={luckyInfo.luckyStatus}
            isBubble={luckyInfo.isBubble}
          />
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
