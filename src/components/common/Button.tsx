type ButtonTheme = 'primary' | 'neutral' | 'subtle';
type ButtonSize = 'medium' | 'small';
type ButtonType = 'fit' | 'full';

interface ButtonStyleProps {
  theme?: ButtonTheme;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
}

interface ButtonComponents extends ButtonStyleProps {
  onClick?: () => void;
  label: string;
}

const BNT_BASE = 'font-pretendard text-pretendard-base rounded-lg border';

const btnTheme = {
  primary:
    'border-primary-30 bg-primary-10 text-gray-50 hover:bg-primary-30 hover:text-white',
  neutral:
    'border-secondary-20 bg-secondary-10 text-gray-50 hover:bg-secondary-20 hover:text-white',
  subtle: 'border-white text-gray-50 hover:border-gray-40',
};

const btnDisabled = 'disabled border-gray-40 bg-gray-20 text-gray-40';

const btnSize = {
  medium: 'p-3',
  small: 'p-2',
};

const btnClassName = ({
  theme = 'primary',
  size = 'medium',
  type = 'fit',
  disabled = false,
}: ButtonStyleProps) => {
  const btnType = type == 'full' ? 'w-full' : '';
  const btnStyle = disabled ? btnDisabled : `${btnTheme[theme]}`;

  return `${BNT_BASE} ${btnStyle} ${btnSize[size]} ${btnType} `;
};

const Button = ({ onClick, label, ...styleProps }: ButtonComponents) => {
  return (
    <button
      type="button"
      className={`${btnClassName({ ...styleProps })}`}
      onClick={onClick}
      disabled={styleProps.disabled}
    >
      {label}
    </button>
  );
};

export default Button;
