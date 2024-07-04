import { useRef } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

interface SelectProps {
  label?: string;
  description?: string;
  disabled?: boolean;
  options: number[];
  name?: string;
  value: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  description,
  disabled = false,
  options,
  name = '',
  onChange,
  value,
}: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectRef.current && e.target !== selectRef.current) {
      selectRef.current.focus();
    }
  };

  const disabledFontTheme = disabled ? 'text-gray-40' : '';

  return (
    <div className={`${disabledFontTheme}`}>
      {label && <p className="font-ryurue text-ryurue-base mb-2">{label}</p>}
      {description && (
        <p className="font-ryurue text-ryurue-sm text-gray-40 mb-3">
          {description}
        </p>
      )}
      <div
        className="border-gray-40 focus-within:even:text-secondary-20 relative cursor-pointer rounded-lg border px-4 py-[10px]"
        onClick={handleWrapperClick}
      >
        <select
          ref={selectRef}
          name={name}
          disabled={disabled}
          className="w-60 appearance-none"
          onChange={onChange}
          value={value}
        >
          {options.map((option: number, id: number) => {
            return (
              <option className="bg-blue m-30" key={id} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <IoChevronDownOutline className="pointer-events-none absolute right-4 top-1/2 col-start-1 row-start-1 -translate-x-1/2 -translate-y-1/2 transform" />
      </div>
    </div>
  );
};

export default Select;
