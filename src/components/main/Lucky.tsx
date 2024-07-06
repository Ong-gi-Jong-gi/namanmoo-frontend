import LuckyLevel1 from '../../assets/lucky/level1.png';
import LuckyLevel2 from '../../assets/lucky/level2.png';
import LuckyLevel3 from '../../assets/lucky/level3.png';
import LuckyLevel4 from '../../assets/lucky/level4.png';

interface LuckyProps {
  level: 1 | 2 | 3 | 4;
}

const LuckySize = {
  1: 'w-60',
  2: 'w-60',
  3: 'w-40',
  4: 'w-72',
};

const luckyImageSrc = {
  1: LuckyLevel1,
  2: LuckyLevel2,
  3: LuckyLevel3,
  4: LuckyLevel4,
};

const Lucky = ({ level }: LuckyProps) => {
  return (
    <div className="mx-auto h-fit w-fit">
      <img src={luckyImageSrc[level]} className={LuckySize[level]} />
    </div>
  );
};

export default Lucky;
