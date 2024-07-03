import { LoginValues } from '../types/auth';

export const loginValidate = (values: LoginValues) => {
  let errors = {};
  if (!values.userId) {
    errors = {
      ...errors,
      userId: '아이디를 입력해주세요',
    };
  }
  if (!values.password) {
    errors = {
      ...errors,
      password: '비밀번호를 입력해주세요',
    };
  }
  return errors;
};
