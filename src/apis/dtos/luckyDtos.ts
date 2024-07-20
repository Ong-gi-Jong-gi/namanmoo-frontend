import { LuckyType } from '../../types/lucky';

export class LuckyDto {
  public readonly luckyId;
  public readonly luckyStatus: 0 | 1 | 2 | 3;
  public readonly isBubble: boolean;

  constructor(data: LuckyType) {
    this.luckyId = data.luckyId;
    this.luckyStatus = data.status;
    this.isBubble = data.isBubble;
  }
}
