import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { RecapUnit } from '../../types/recap';
import { formatDate } from '../../utils/formatter';
import Lucky from '../main/Lucky';

const CompleteRecapUnit = ({
  luckyId,
  luckyStatus,
  startDate,
  endDate,
}: RecapUnit) => {
  const navigate = useNavigate();
  const luckySize = clsx(
    'flex h-40 items-center',
    `${luckyStatus == 3 ? 'p-3' : ''}`,
  );

  const isAlive = new Date().getTime() < parseInt(endDate);

  const luckyTile = clsx(
    'flex flex-col items-center justify-center rounded-md p-4',
    isAlive ? 'bg-primary-10' : 'bg-secondary-10',
  );

  const handleClickUnit = () => {
    navigate(`${routes.recap}?luckyId=${luckyId}`);
  };

  return (
    <div className={luckyTile} onClick={handleClickUnit}>
      <div className={luckySize}>
        <Lucky level={luckyStatus} />
      </div>
      <div className="font-ryurue text-ryurue-base">
        <p>
          {formatDate(startDate)} {isAlive && <span>~</span>}
        </p>
        {!isAlive ? <p>{`~ ${formatDate(endDate)}`}</p> : null}
      </div>
    </div>
  );
};

export default CompleteRecapUnit;
