import LuckyLevel1 from '../../assets/lucky/level1.svg';
import LuckyLevel2 from '../../assets/lucky/level2.svg';
import LuckyLevel3 from '../../assets/lucky/level3.svg';
import LuckyLevel4 from '../../assets/lucky/level4.svg';

interface LuckyProps {
  level: 1 | 2 | 3 | 4;
}

const LuckySize = {
  1: 'w-44',
  2: 'w-44',
  3: 'w-32',
  4: 'w-60',
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
    <div className="w-">
      <img src={getLuckyImageSrc(level)} className={LuckySize[level]} />
    </div>
  );
};

export default Lucky;
