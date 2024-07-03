interface Field {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  pattern?: string;
  errorMsg?: string;
}

interface LoginFields {
  userId: Field;
  password: Field;
}

const LOGIN: LoginFields = {
  userId: {
    name: 'userId',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
  },
  password: {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
};

interface SignupFields {
  name: Field;
  nickname: Field;
  userId: Field;
  password: Field;
  passwordConfirm: Field;
}
const SIGNUP: SignupFields = {
  name: {
    name: 'name',
    label: '이름',
    type: 'text',
    placeholder: '이름을 입력해주세요',
  },
  nickname: {
    name: 'nickname',
    label: '닉네임',
    type: 'text',
    placeholder: '닉네임을 입력해주세요',
  },
  userId: {
    name: 'userId',
    label: '아이디',
    type: 'text',
    placeholder: '아이디를 입력해주세요',
    pattern: '/^(?=.*[a-z])(?=.*d)[A-Za-zd]{6,}$/;', // 6자 이상, 영문, 숫자
    errorMsg: '6자 이상, 영문, 숫자를 포함해주세요',
  },
  password: {
    name: 'password',
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    pattern: '/^(?=.*[a-z])(?=.*d)[A-Za-zd!@#$%^&*()_+]{8,}$/;', // 8자 이상, 영문, 숫자, 특수문자
    errorMsg: '8자 이상, 영문, 숫자, 특수문자를 포함해주세요',
  },
  passwordConfirm: {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 다시 입력해주세요',
    errorMsg: '비밀번호가 일치하지 않습니다',
  },
};

export default { LOGIN, SIGNUP };
