import { UserRole } from './family';

export interface LoginValues {
  userId: string;
  password: string;
}

export interface SignupValues {
  name: string;
  nickname: string;
  userId: string;
  password: string;
  passwordConfirm: string;
}

export interface UserInfoEditType {
  name: string;
  nickname: string;
  userImg: string | File;
  role: UserRole;
}
