import Button from './Button';

type InputType = 'text' | 'password' | 'email';
type InputCase = 'normal' | 'error' | 'disabled';

interface InputStyleProps {
  isFull?: boolean;
  inputCase?: InputCase;
}

interface InputComponentProps extends InputStyleProps {
  name?: string;
  label?: string;
  description?: string;
  message?: string;
  placeholder?: string;
  value: string;
  type?: InputType;
  hasBtn?: boolean;
  btnLabel?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const INPUT_BASE =
  'font-pretendard w-full border-gray-40 flex-1 border-b-[1.5px] px-4 py-3 focus:border-gray-50 focus:text-gray-50';

const inputTypeTheme = {
  normal: 'text-gray-50',
  error: 'border-red text-gray-50',
  disabled: 'border-gray-20 bg-gray-20 text-gray-40',
};

const inputFontTheme = (inputCase: string) =>
  `${inputCase == 'disabled' ? 'text-gray-40' : 'text-gray-50'}`;

const inputClassName = ({ inputCase = 'normal' }: { inputCase: InputCase }) => {
  return `${INPUT_BASE} ${inputTypeTheme[inputCase]} `;
};

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
  isFull = false,
  inputCase = 'normal',
}: InputComponentProps) => {
  const inputWrapperTheme = (isFull: boolean) =>
    isFull ? 'w-full' : 'max-w-60';

  return (
    <div
      className={`${inputWrapperTheme(isFull)} ${inputFontTheme(inputCase)}`}
    >
      <p className="font-ryurue text-ryurue-base">{label}</p>
      <p className="font-ryurue text-ryurue-sm text-gray-40">{description}</p>
      <div className="flex w-full gap-2">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          className={`${inputClassName({ inputCase })}`}
          disabled={inputCase == 'disabled'}
          size={1}
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
