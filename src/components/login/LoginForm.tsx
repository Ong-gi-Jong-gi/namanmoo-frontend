import FORM_INFO from '../../constants/FORM_INFO';
import useForm from '../../hooks/useForm';
import { LoginValues } from '../../types/auth';
import { loginValidate } from '../../utils/validate';
import Button from '../common/Button';
import Input from '../common/Input';

const LoginForm = () => {
  const { values, handleChange, handleSubmit, errors } = useForm<LoginValues>({
    initialValues: {
      userId: '',
      password: '',
    },
    onSubmit: () => {
      console.log('로그인 성공');
    },
    validate: loginValidate,
  });
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-12">
      <h2 className="font-ryurue text-ryurue-lg">로그인</h2>
      <Input
        value={values.userId}
        onChange={handleChange}
        inputCase={errors.userId ? 'error' : 'normal'}
        message={errors.userId}
        {...FORM_INFO.LOGIN.userId}
      />
      <Input
        value={values.password}
        onChange={handleChange}
        inputCase={errors.password ? 'error' : 'normal'}
        message={errors.password}
        {...FORM_INFO.LOGIN.password}
      />
      <Button onClick={handleSubmit} label="로그인" type="full" />
    </form>
  );
};

export default LoginForm;
