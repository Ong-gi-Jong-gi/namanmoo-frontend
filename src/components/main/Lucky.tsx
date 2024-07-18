import LuckyLevel1 from '../../assets/lucky/level1.png';
import LuckyLevel2 from '../../assets/lucky/level2.png';
import LuckyLevel3 from '../../assets/lucky/level3.png';
import LuckyLevel4 from '../../assets/lucky/level4.png';

interface LuckyProps {
  level: 0 | 1 | 2 | 3;
}

const LuckySize = {
  0: 'w-60',
  1: 'w-60',
  2: 'w-40',
  3: 'w-64 xs:w-80',
};

const luckyImageSrc = {
  0: LuckyLevel1,
  1: LuckyLevel2,
  2: LuckyLevel3,
  3: LuckyLevel4,
};

const Lucky = ({ level }: LuckyProps) => {
  return (
    <div className="mx-auto h-fit w-fit">
      <img src={luckyImageSrc[level]} className={LuckySize[level]} />
    </div>
  );
};

export default Lucky;
