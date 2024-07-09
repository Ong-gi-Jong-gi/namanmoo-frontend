import { UserRole } from './family';

export interface UserInfo {
  userId: string;
  name: string;
  nickname: string;
  role: UserRole;
  memberImage: string;
}
