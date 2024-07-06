import { UserInfo } from './user';

export type UserRole = '아빠' | '엄마' | '아들' | '딸';

/* API */

// getMyFamilyInfo
export interface GetMyFamilyInfoResponse {
  members: UserInfo[];
}
