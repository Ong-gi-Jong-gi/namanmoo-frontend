import { UserRole } from '../../types/family';
import { UserInfo } from '../../types/user';

export class UserInfoDto {
  public userId: number;
  public name: string;
  public nickname: string;
  public role: UserRole;
  public userImg: string;

  constructor(data: UserInfo) {
    this.userId = data.userId;
    this.name = data.name;
    this.nickname = data.nickname;
    this.role = data.role;
    this.userImg = data.userImg;
  }
}
