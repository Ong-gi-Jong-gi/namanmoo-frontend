import clsx from 'clsx';

type IconButtonTheme = 'primary' | 'neutral' | 'subtle' | 'selectedNeutral';

interface IconButtonStyleProps {
  theme?: IconButtonTheme;
  disabled?: boolean;
}

interface IconButtonComponents extends IconButtonStyleProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  label?: string;
}

const btnTheme = {
  primary:
    'bg-primary-10 hover:bg-primary-30 text-gray-50 hover:text-white border-primary-30',
  neutral:
    'bg-secondary-10 hover:bg-secondary-20 text-gray-50 hover:text-white border-secondary-20',
  selectedNeutral: 'bg-secondary-20 text-gray-50 border-secondary-20',
  subtle: 'text-gray-50 hover:border-gray-40 border-gray-40 border-opacity-0',
};

const IconButton = ({
  theme = 'primary',
  disabled = false,
  icon,
  label,
  onClick,
}: IconButtonComponents) => {
  const btnClass = clsx(
    'flex h-14 w-14 items-center justify-center rounded-full border-2',
    btnTheme[theme],
    {
      'disabled border-gray-40 bg-gray-20 text-gray-40': disabled,
    },
  );
  return (
    <div className="flex w-fit flex-col items-center gap-1">
      <button onClick={onClick} className={btnClass}>
        {icon}
      </button>
      {label && (
        <span className="font-pretendard font-pretendard-bold">{label}</span>
      )}
    </div>
  );
};

export default IconButton;
