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
  running,
}: RecapUnit) => {
  const navigate = useNavigate();
  const luckySize = clsx(
    'flex h-52 items-center',
    `${luckyStatus == 2 ? 'p-5' : ''}`,
  );

  const luckyTile = clsx(
    'flex flex-col items-center justify-center gap-3 rounded-md p-4',
    running ? 'bg-primary-10' : 'bg-secondary-10',
  );

  const handleClickUnit = () => {
    navigate(`${routes.recap}?luckyId=${luckyId}`);
  };

  return (
    <div className={luckyTile} onClick={handleClickUnit}>
      <div className={luckySize}>
        <Lucky level={luckyStatus} />
      </div>
      <div className="font-ryurue text-ryurue-sm">
        <p>
          {formatDate(startDate)} {running && <span>~</span>}
        </p>
        {!running ? <p>{`~ ${formatDate(endDate)}`}</p> : null}
      </div>
    </div>
  );
};

export default CompleteRecapUnit;
