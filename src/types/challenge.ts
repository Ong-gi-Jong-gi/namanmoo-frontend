import { ChallengeAnswerDto } from '../apis/dtos/challengeDtos';
import { UserInfo } from './user';

export type ChallengeType =
  | 'NORMAL'
  | 'GROUP_CHILD'
  | 'GROUP_PARENT'
  | 'FACETIME'
  | 'PHOTO'
  | 'VOICE';

export interface ChallengeInfo {
  challengeId: string;
  challengeNumber: string;
  challengeTitle: string;
  challengeType: ChallengeType;
}

export interface ChallengeToday {
  challengeInfo: ChallengeInfo;
  isDone: boolean;
}

export interface ChallengeDetail
  extends Omit<ChallengeInfo, 'challengeId' | 'challengeType'> {
  challengeDate: string;
  isComplete: boolean;
}

export interface ChallengeGroupDetail
  extends Omit<ChallengeDetail, 'challengeTitle'> {}

export interface ChallengeAnswer extends Omit<UserInfo, 'name'> {
  answer: string;
}

export interface ChallengeGroupAnswer {
  challengeTitle: string;
  answerList: ChallengeAnswerDto[];
}

export interface ChallengeListUnitType extends ChallengeInfo {
  isComplete: boolean;
}

export type FilterType = 'none' | 'sunglasses' | 'rainbow' | 'dog';
export type FilterTypeWithoutNone = Exclude<FilterType, 'none'>;
export interface FilterPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface VideoSize {
  width: number;
  height: number;
}
export type facetimeChallengeStatus = 'idle' | 'ongoing' | 'finished';
