import { useNavigate } from 'react-router-dom';
import { usePostLogin } from '../../apis/auth/login';
import FORM_INFO from '../../constants/FORM_INFO';
import routes from '../../constants/routes';
import useForm from '../../hooks/useForm';
import { LoginValues } from '../../types/auth';
import { loginValidate } from '../../utils/validate';
import Button from '../common/Button';
import Input from '../common/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate: loginMutate } = usePostLogin();
  const { values, handleChange, handleSubmit, errors } = useForm<LoginValues>({
    initialValues: {
      userId: '',
      password: '',
    },
    onSubmit: () => {
      loginMutate(values);
    },
    validate: loginValidate,
  });
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-12">
      <h2 className="mx-auto font-ryurue text-ryurue-lg">로그인</h2>
      <Input
        value={values.userId}
        onChange={handleChange}
        inputCase={errors.userId ? 'error' : 'normal'}
        message={errors.userId}
        isFull
        {...FORM_INFO.LOGIN.userId}
      />
      <Input
        value={values.password}
        onChange={handleChange}
        inputCase={errors.password ? 'error' : 'normal'}
        message={errors.password}
        isFull
        {...FORM_INFO.LOGIN.password}
      />
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleSubmit} label="로그인" type="full" />
        <span className="font-pretendard text-pretendard-base">
          아직 회원이 아니신가요?
          <button
            type="button"
            onClick={() => navigate(routes.signup)}
            className="ml-2 cursor-pointer font-pretendard-bold text-primary-30 underline"
          >
            회원가입
          </button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
