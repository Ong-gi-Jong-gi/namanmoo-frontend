import { useMemo } from 'react';
import { useGetLucky } from '../../apis/lucky/getLucky';
import { usePostLuckyBubble } from '../../apis/lucky/postLuckyBubble';
import balloon from '../../assets/lucky/balloon.svg';
import { getRandomMessage } from '../../utils/luckyMessage';
import RiveLucky from './RiveLucky';

const LuckySection = () => {
  const { data: luckyInfo } = useGetLucky();
  const { mutate } = usePostLuckyBubble();

  const handleLuckyBubble = () => {
    mutate();
  };

  const message = useMemo(() => getRandomMessage(), []);

  return (
    <div className="flex flex-col items-center justify-end">
      {luckyInfo.isBubble && (
        <div className="relative right-4 top-6" onClick={handleLuckyBubble}>
          <img src={balloon} alt="balloon" />
          <p className="absolute left-1/2 top-[47%] w-full -translate-x-1/2 -translate-y-1/2 transform text-center font-ryurue text-ryurue-base">
            {message}
          </p>
        </div>
      )}
      <RiveLucky level={luckyInfo.luckyStatus} isBubble={luckyInfo.isBubble} />
    </div>
  );
};

export default LuckySection;
