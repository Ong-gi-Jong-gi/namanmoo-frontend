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

const getLuckyImageSrc = (level: 1 | 2 | 3 | 4) => {
  switch (level) {
    case 1:
      return LuckyLevel1;
    case 2:
      return LuckyLevel2;
    case 3:
      return LuckyLevel3;
    case 4:
      return LuckyLevel4;
  }
};

const Lucky = ({ level }: LuckyProps) => {
  return (
    <div className="mx-auto h-fit w-fit">
      <img src={getLuckyImageSrc(level)} className={LuckySize[level]} />
    </div>
  );
};

export default Lucky;
