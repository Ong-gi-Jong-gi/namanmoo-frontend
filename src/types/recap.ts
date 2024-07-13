import { UserInfo } from '../types/user';
import { ChallengeInfo } from './challenge';

export interface RecapUnit {
  luckyId: string;
  startDate: string;
  endDate: string;
  luckyStatus: 1 | 2 | 3 | 4;
}

export interface RecapUser extends Omit<UserInfo, 'name'> {}

export interface RecapMigos extends RecapUser {
  thanks: string;
  sorry: string;
}

export interface RecapDetail {
  totalCount: number;
  luckyStatus: 1 | 2 | 3 | 4;
}

export interface RecapRanking extends RecapUser {
  count: number;
}

export interface RecapStatistics extends ChallengeInfo {
  topic: string;
  topicResult: number;
}
