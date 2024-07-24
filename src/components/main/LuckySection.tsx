import { useMemo } from 'react';
import { useGetLucky } from '../../apis/lucky/getLucky';
import { usePostLuckyBubble } from '../../apis/lucky/postLuckyBubble';
import Cloud1 from '../../assets/images/cloud1.svg';
import Cloud2 from '../../assets/images/cloud2.svg';
import Cloud3 from '../../assets/images/cloud3.svg';
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

  const renderBackground = () => {
    switch (luckyInfo.luckyStatus) {
      case 0:
        return null;
      case 1:
        return (
          <div className="absolute -left-4 top-1/4">
            <img src={Cloud1} width={280} />
          </div>
        );
      case 2:
        return (
          <div className="absolute -left-8 top-1/4 w-52">
            <img src={Cloud2} width={180} />
          </div>
        );
      case 3:
        return (
          <div className="absolute -left-4 top-32 w-52">
            <img src={Cloud3} width={140} />
          </div>
        );
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-end">
        {luckyInfo.isBubble && (
          <div className="absolute -top-[45%] z-10" onClick={handleLuckyBubble}>
            <img src={balloon} alt="balloon" className="scale-110" />
            <p className="absolute left-1/2 top-[47%] w-full -translate-x-1/2 -translate-y-1/2 transform text-center font-ryurue text-ryurue-base">
              {message}
            </p>
          </div>
        )}
        <RiveLucky
          level={luckyInfo.luckyStatus}
          isBubble={luckyInfo.isBubble}
        />
      </div>
      {renderBackground()}
    </>
  );
};

export default LuckySection;
