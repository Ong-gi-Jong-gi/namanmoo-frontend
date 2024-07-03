interface TextAreaProps {
  label?: string;
  placeholder?: string;
  description?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  label = '',
  description = '',
  placeholder = '',
  value = '',
  disabled = false,
  onChange,
}: TextAreaProps) => {
  const disabledBackground = disabled
    ? 'bg-gray-20 text-gray-40'
    : 'bg-white text-gray-50';
  const disabledFontTheme = disabled ? 'text-gray-40' : 'text-gray-50';

  return (
    <div className={`w-full min-w-60`}>
      {label && (
        <p className={`font-ryurue text-ryurue-base ${disabledFontTheme}`}>
          {label}
        </p>
      )}
      {description && (
        <p className="font-ryurue text-ryurue-sm text-gray-40">{description}</p>
      )}
      <textarea
        placeholder={placeholder}
        defaultValue={value}
        className={`font-pretendard-normal text-pretendard-base resize-none ${disabledBackground} border-gray-40 rounded-lg border px-4 py-3`}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
