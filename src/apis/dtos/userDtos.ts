import { UserRole } from '../../types/family';
import { UserInfo } from '../../types/user';

export class UserInfoDto {
  public readonly userId: string;
  public readonly name: string;
  public readonly nickname: string;
  public readonly role: UserRole;
  public readonly userImg: string;

  constructor(data: UserInfo) {
    this.userId = data.userId;
    this.name = data.name;
    this.nickname = data.nickname;
    this.role = data.role;
    this.userImg = data.memberImage;
  }
}
