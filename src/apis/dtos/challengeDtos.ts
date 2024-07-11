import {
  ChallengeAnswer,
  ChallengeDetail,
  ChallengeGroupAnswer,
  ChallengeInfo,
  ChallengeListUnit,
} from '../../types/challenge';
import { UserInfoDto } from './userDtos';

export class ChallengeInfoDto {
  public readonly challengeId: string;
  public readonly challengeNumber: string;
  public readonly challengeTitle: string;
  public readonly challengeType: string;

  constructor(data: ChallengeInfo) {
    this.challengeId = data.challengeId;
    this.challengeNumber = data.challengeNumber;
    this.challengeTitle = data.challengeTitle;
    this.challengeType = data.challengeType;
  }
}

export class ChallengeGroupDetailDto {
  public readonly challengeNumber: string;
  public readonly challengeDate: string;
  public readonly isComplete: boolean;

  constructor(data: ChallengeDetail) {
    this.challengeNumber = data.challengeNumber;
    this.challengeDate = data.challengeDate;
    this.isComplete = data.isComplete;
  }
}

export class ChallengeDetailDto extends ChallengeGroupDetailDto {
  public readonly challengeTitle: string;

  constructor(data: ChallengeDetail) {
    super(data);
    this.challengeTitle = data.challengeTitle;
  }
}

export class ChallengeAnswerDto extends UserInfoDto {
  public readonly answer: string | null;

  constructor(data: ChallengeAnswer) {
    super({ ...data, name: '' });
    this.answer = data.answer;
  }
}

export class ChallengeGroupAnswerDto {
  public readonly challengeTitle: string;
  public readonly answerList: ChallengeAnswerDto[];

  constructor(data: ChallengeGroupAnswer) {
    this.challengeTitle = data.challengeTitle;
    this.answerList = data.answerList;
  }
}

export class ChallengeListUnitDto extends ChallengeInfoDto {
  public readonly isComplete: boolean;

  constructor(data: ChallengeListUnit) {
    super(data);
    this.isComplete = data.isComplete;
  }
}
