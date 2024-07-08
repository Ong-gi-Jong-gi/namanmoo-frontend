import clsx from 'clsx';
import { RecapUnit } from '../../types/recap';
import { formatDate } from '../../utils/formatter';
import Lucky from '../main/Lucky';

const CompleteRecapUnit = ({ luckyStatus, startDate, endDate }: RecapUnit) => {
  const luckySize = clsx(
    'flex h-40 items-center',
    `${luckyStatus == 3 ? 'p-3' : ''}`,
  );

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-secondary-10 p-4">
      <div className={luckySize}>
        <Lucky level={luckyStatus} />
      </div>
      <div className="font-ryurue text-ryurue-base">
        <p>{formatDate(startDate)}</p>
        <p>{`~ ${formatDate(endDate)}`}</p>
      </div>
    </div>
  );
};

export default CompleteRecapUnit;
