import FORM_INFO from '../constants/FORM_INFO';
import { LoginValues, SignupValues, UserInfoEditType } from '../types/auth';

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

export const userInfoEditValidate = (values: UserInfoEditType) => {
  let errors = {};

  if (!values.name) {
    errors = {
      ...errors,
      name: '이름을 입력해주세요',
    };
  }

  if (values.name.length < 2) {
    errors = {
      ...errors,
      name: '이름은 2글자 이상이어야 합니다',
    };
  }

  // nickname
  if (!values.nickname) {
    errors = {
      ...errors,
      nickname: '닉네임을 입력해주세요',
    };
  }

  if (values.nickname.length < 2) {
    errors = {
      ...errors,
      nickname: '닉네임은 2글자 이상이어야 합니다',
    };
  }

  return errors;
};

export const signupValidate = (values: SignupValues) => {
  let errors = {};

  // name
  if (!values.name) {
    errors = {
      ...errors,
      name: '이름을 입력해주세요',
    };
  }

  if (values.name.length < 2) {
    errors = {
      ...errors,
      name: '이름은 2글자 이상이어야 합니다',
    };
  }

  // nickname
  if (!values.nickname) {
    errors = {
      ...errors,
      nickname: '닉네임을 입력해주세요',
    };
  }

  if (values.nickname.length < 2) {
    errors = {
      ...errors,
      nickname: '닉네임은 2글자 이상이어야 합니다',
    };
  }

  // userId
  if (!values.userId) {
    errors = {
      ...errors,
      userId: '아이디를 입력해주세요',
    };
  }

  if (
    FORM_INFO.SIGNUP.userId.pattern &&
    !FORM_INFO.SIGNUP.userId.pattern.test(values.userId)
  ) {
    errors = {
      ...errors,
      userId: FORM_INFO.SIGNUP.userId.errorMsg,
    };
  }

  // password
  if (!values.password) {
    errors = {
      ...errors,
      password: '비밀번호를 입력해주세요',
    };
  }

  if (
    FORM_INFO.SIGNUP.password.pattern &&
    !FORM_INFO.SIGNUP.password.pattern.test(values.password)
  ) {
    console.log(
      values.password,
      FORM_INFO.SIGNUP.password.pattern.test(values.password),
    );
    errors = {
      ...errors,
      password: FORM_INFO.SIGNUP.password.errorMsg,
    };
  }

  // passwordConfirm
  if (!values.passwordConfirm) {
    errors = {
      ...errors,
      passwordConfirm: '비밀번호 확인을 입력해주세요',
    };
  }
  if (values.password !== values.passwordConfirm) {
    errors = {
      ...errors,
      passwordConfirm: '비밀번호가 일치하지 않습니다',
    };
  }
  return errors;
};
