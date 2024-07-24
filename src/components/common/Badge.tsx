import clsx from 'clsx';

interface Props {
  text: string;
  color: string;
}

const Badge = ({ text, color }: Props) => {
  const badgeClassName = clsx(
    'rounded-md px-2 py-1 font-pretendard text-[14px] leading-none text-gray-50',
  );

  return (
    <p className={badgeClassName} style={{ backgroundColor: color }}>
      {text}
    </p>
  );
};

export default Badge;
