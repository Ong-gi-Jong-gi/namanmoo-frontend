import clsx from 'clsx';
import crown from '../../assets/images/crown.svg';
import { RecapRanking } from '../../types/recap';
import Profile from '../common/Profile';

interface Props extends RecapRanking {
  isFirst: boolean;
}

const RecapRankingUnit = ({
  userImg,
  nickname,
  role,
  count,
  isFirst,
}: Props) => {
  const rankingUnitClass = clsx(
    'overflow-view relative m-auto flex w-11/12 items-center justify-between rounded-lg px-3 py-2',
    isFirst ? 'bg-secondary-10' : 'bg-gray-10',
  );

  return (
    <div className={rankingUnitClass}>
      <Profile
        type={userImg ? 'image' : 'default'}
        layout="horizontal"
        src={userImg}
        userName={nickname}
        userRole={role}
        isText
      />
      <p className="font-ryurue text-ryurue-base">
        챌린지 참여
        <span className="mx-2 text-ryurue-md text-secondary-20">{count}</span>회
      </p>
      {isFirst && (
        <img
          src={crown}
          alt="ranking_crown"
          className="absolute -left-3 -top-5"
        />
      )}
    </div>
  );
};

export default RecapRankingUnit;
