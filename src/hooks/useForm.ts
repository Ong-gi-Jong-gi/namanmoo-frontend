import { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: () => void;
  validate: (value: T) => Partial<Record<keyof T, string>>;
}

const useForm = <T>({ initialValues, onSubmit, validate }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const result = validate(values);
    setErrors(result);

    // 유효한 경우에만 submit
    if (Object.keys(result).length === 0) {
      onSubmit();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
  };
};
export default useForm;
