import { UserRole } from './family';

export interface UserInfo {
  userId: number;
  name: string;
  nickname: string;
  role: UserRole;
  userImg: string;
}
