import { UserRole } from '../types/family';

// FIXME: 추후에 제거
export const MAX_FAMILY_MEMBER = 4;

export const FAMILY_SIZE = Object.freeze({
  MIN_FAMILY_SIZE: 3,
  MAX_FMAILY_SIZE: 5,
});

export const FAMILY_ROLE = Object.freeze<UserRole[]>([
  '아빠',
  '엄마',
  '딸',
  '아들',
]);

type FamilyRoleEng = Record<UserRole, string>;

export const FAMILY_ROLE_ENG: FamilyRoleEng = Object.freeze({
  아빠: 'father',
  엄마: 'mother',
  딸: 'daughter',
  아들: 'son',
});
