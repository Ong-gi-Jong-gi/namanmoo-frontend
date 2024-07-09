import { ChallengeAnswerDto } from '../apis/dtos/challengeDtos';
import { UserInfo } from './user';

type ChallengeType = 'NormalC' | 'GroupC' | 'FaceTimeC' | 'PhotoC' | 'VoiceC';

export interface ChallengeInfo {
  challengeId: string;
  challengeNumber: string;
  challengeTitle: string;
  challengeType: ChallengeType;
}

export interface ChallengeDetail
  extends Omit<ChallengeInfo, 'challengeId' | 'challengeType'> {
  challengeDate: string;
  isCompleted: boolean;
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
export type FilterType = 'none' | 'sunglasses';
export type FilterTypeWithoutNone = Exclude<FilterType, 'none'>;
