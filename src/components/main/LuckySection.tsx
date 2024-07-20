import { useGetLucky } from '../../apis/lucky/getLucky';
import { usePostLuckyBubble } from '../../apis/lucky/postLuckyBubble';
import balloon from '../../assets/lucky/balloon.svg';
import { MAX_FAMILY_MEMBER } from '../../constants/family';
import { getRandomMessage } from '../../utils/luckyMessage';
import Lucky from './Lucky';
import RiveLucky from './RiveLucky';

interface LuckySectionProps {
  currentFamilySize: number;
}

const LuckySection = ({ currentFamilySize }: LuckySectionProps) => {
  const isFamilyFull = currentFamilySize === MAX_FAMILY_MEMBER;
  const { data: luckyInfo, isLoading } = useGetLucky({ enabled: isFamilyFull });
  const { mutate } = usePostLuckyBubble();

  const handleLuckyBubble = () => {
    mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (!luckyInfo) return <Lucky level={0} />;

  return (
    <div className="flex flex-col items-center justify-end">
      {luckyInfo.isBubble && (
        <div className="relative right-4 top-6" onClick={handleLuckyBubble}>
          <img src={balloon} alt="balloon" />
          <p className="absolute left-1/2 top-[47%] w-full -translate-x-1/2 -translate-y-1/2 transform text-center font-ryurue text-ryurue-base">
            {getRandomMessage()}
          </p>
        </div>
      )}
      <RiveLucky level={luckyInfo.luckyStatus} isBubble={luckyInfo.isBubble} />
    </div>
  );
};

export default LuckySection;
