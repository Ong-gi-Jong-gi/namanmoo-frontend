import { UserRole } from '../../types/family';
import {
  RecapDetail,
  RecapAppreciationsType,
  RecapRanking,
  RecapStatistics,
  RecapUnit,
  RecapUser,
  YouthRecap,
} from '../../types/recap';
import { ChallengeInfoDto } from './challengeDtos';

export class RecapUnitDTO {
  public readonly luckyId: string;
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly luckyStatus: 0 | 1 | 2 | 3;

  constructor(data: RecapUnit) {
    this.luckyId = data.luckyId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.luckyStatus = data.luckyStatus;
  }
}

export class RecapUserDTO {
  public readonly userId: string;
  public readonly userImg: string;
  public readonly nickname: string;
  public readonly role: UserRole;

  constructor(data: RecapUser) {
    this.userId = data.userId;
    this.userImg = data.userImg;
    this.nickname = data.nickname;
    this.role = data.role;
  }
}

export class RecapAppreciationsDTO extends RecapUserDTO {
  public readonly thanks: string;
  public readonly sorry: string;

  constructor(data: RecapAppreciationsType) {
    super(data);
    this.thanks = data.thanks;
    this.sorry = data.sorry;
  }
}

export class RecapDetailDTO {
  public readonly totalCount: number;
  public readonly luckyStatus: 0 | 1 | 2 | 3;

  constructor(data: RecapDetail) {
    this.totalCount = data.totalCount;
    this.luckyStatus = data.luckyStatus;
  }
}

export class RecapRankingDTO extends RecapUserDTO {
  public readonly count: number;

  constructor(data: RecapRanking) {
    super(data);
    this.count = data.count;
  }
}

export class RecapStatisticsDTO extends ChallengeInfoDto {
  public readonly topic: string;
  public readonly topicResult: number;

  constructor(data: RecapStatistics) {
    super(data);
    this.topic = data.topic;
    this.topicResult = data.topicResult;
  }
}

export class YouthRecapDTO {
  public readonly photoUrl: string;
  public readonly text: string;

  constructor(data: YouthRecap) {
    this.photoUrl = data.photo;
    this.text = data.text;
  }
}
