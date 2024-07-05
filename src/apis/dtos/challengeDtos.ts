import { ChallengeInfo } from '../../types/challenge';

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
