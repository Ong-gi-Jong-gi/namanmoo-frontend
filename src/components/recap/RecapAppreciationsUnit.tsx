import clsx from 'clsx';
import { RecapMigos } from '../../types/recap';
import Profile from '../common/Profile';

interface Props extends RecapMigos {
  index: number;
}

const RecapThanksAndSorryUnit = ({
  userImg,
  nickname,
  role,
  sorry,
  thanks,
  index,
}: Props) => {
  const migoPositionClass: Record<number, string> = {
    1: 'rotate-12',
    2: '-rotate-12',
    3: 'rotate-12',
    4: '-rotate-12',
  };

  const migosUnitClass = clsx(
    '-mt-[80px] flex h-64 w-64 flex-col justify-between rounded-2xl border-[5px] border-secondary-20 bg-background p-3 font-ryurue text-ryurue-base',
    index % 2 ? 'float-right' : 'float-left',
    index % 2 ? 'border-primary-20' : 'border-secondary-20',
    migoPositionClass[index],
  );

  return (
    <div className={migosUnitClass}>
      <Profile
        type={userImg ? 'image' : 'default'}
        layout="horizontal"
        src={userImg}
        userName={nickname}
        userRole={role}
        isText
      />
      <p className="border-secondary-20">{sorry}</p>
      <p>{thanks}</p>
    </div>
  );
};

export default RecapThanksAndSorryUnit;
