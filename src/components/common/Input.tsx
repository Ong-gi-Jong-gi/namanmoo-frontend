import Button from './Button';

type InputFull = 'fit' | 'full';
type InputType = 'text' | 'password' | 'email';
type InputCase = 'normal' | 'error' | 'disabled';

interface InputStyleProps {
  isFull?: InputFull;
  inputCase?: InputCase;
}

interface InputComponentProps extends InputStyleProps {
  name?: string;
  label?: string;
  description?: string;
  message?: string;
  placeholder: string;
  value: string;
  type?: InputType;
  hasBtn?: boolean;
  btnLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const INPUT_BASE =
  'w-full font-pretendard border-gray-40 text-gray-50 flex-1 px-4 py-3 border-b-[1.5px] focus:border-gray-50 focus:text-gray-50';

const inputTheme = {
  normal: '',
  error: 'border-red',
  disabled: 'border-gray-20 bg-gray-20',
};

const inputClassName = ({
  isFull = 'fit',
  inputCase = 'normal',
}: InputStyleProps) => {
  const widthClassName = isFull == 'fit' ? '' : 'w-full';

  return `${INPUT_BASE} ${widthClassName} ${inputTheme[inputCase]} `;
};

const inputFontTheme = (inputCase: string) =>
  `${inputCase == 'disabled' ? 'text-gray-40' : 'text-gray-50'}`;

const Input = ({
  name = '',
  label = '',
  description = '',
  message = '',
  placeholder = '',
  value = '',
  type = 'text',
  hasBtn = false,
  btnLabel = 'Button',
  onChange,
  isFull = 'fit',
  inputCase = 'normal',
}: InputComponentProps) => {
  return (
    <div className={`max-w-60 ${inputFontTheme(inputCase)}`}>
      <p className="font-ryurue text-ryurue-base">{label}</p>
      <p className="font-ryurue text-ryurue-sm text-gray-40">{description}</p>
      <div className="flex w-full gap-2">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          className={` ${inputClassName({ isFull, inputCase })}`}
          disabled={inputCase == 'disabled'}
        />
        {hasBtn && btnLabel && (
          <Button label={btnLabel} disabled={inputCase == 'disabled'} />
        )}
      </div>
      {message && inputCase == 'error' && (
        <p className="mt-2 font-pretendard-normal text-red">{message}</p>
      )}
    </div>
  );
};

export default Input;
