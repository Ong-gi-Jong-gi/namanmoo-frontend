import { useNavigate } from 'react-router-dom';
import FORM_INFO from '../../constants/FORM_INFO';
import routes from '../../constants/routes';
import useForm from '../../hooks/useForm';
import { SignupValues } from '../../types/auth';
import { signupValidate } from '../../utils/validate';
import Button from '../common/Button';
import Input from '../common/Input';

const SignupForm = () => {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, errors } = useForm<SignupValues>({
    initialValues: {
      userId: '',
      password: '',
      passwordConfirm: '',
      name: '',
      nickname: '',
    },
    onSubmit: () => {
      navigate(routes.login);
    },
    validate: signupValidate,
  });

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-12">
      <h2 className="mx-auto font-ryurue text-ryurue-lg">회원가입</h2>
      <Input
        value={values.userId}
        onChange={handleChange}
        inputCase={errors.userId ? 'error' : 'normal'}
        message={errors.userId}
        isFull
        {...FORM_INFO.SIGNUP.userId}
      />
      <Input
        value={values.password}
        onChange={handleChange}
        inputCase={errors.password ? 'error' : 'normal'}
        message={errors.password}
        isFull
        {...FORM_INFO.SIGNUP.password}
      />
      <Input
        value={values.passwordConfirm}
        onChange={handleChange}
        inputCase={errors.passwordConfirm ? 'error' : 'normal'}
        message={errors.passwordConfirm}
        isFull
        {...FORM_INFO.SIGNUP.passwordConfirm}
      />
      <Input
        value={values.name}
        onChange={handleChange}
        inputCase={errors.name ? 'error' : 'normal'}
        message={errors.name}
        isFull
        {...FORM_INFO.SIGNUP.name}
      />
      <Input
        value={values.nickname}
        onChange={handleChange}
        inputCase={errors.nickname ? 'error' : 'normal'}
        message={errors.nickname}
        isFull
        {...FORM_INFO.SIGNUP.nickname}
      />
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleSubmit} label="회원가입" type="full" />
        <span className="font-pretendard text-pretendard-base">
          이미 회원이신가요?
          <span
            onClick={() => navigate(routes.login)}
            className="ml-2 cursor-pointer font-pretendard-bold text-primary-30 underline"
          >
            로그인
          </span>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
