import clsx from 'clsx';

const RecapBarUnit = ({
  isBright,
  isTarget,
}: {
  isBright: boolean;
  isTarget: boolean;
}) => {
  const unitClass = clsx(
    'linear h-1 transition',
    isTarget ? 'w-full' : 'w-[100px]',
    isBright ? 'bg-secondary-20' : 'bg-gray-20',
  );

  return <div className={unitClass}></div>;
};

export default RecapBarUnit;
