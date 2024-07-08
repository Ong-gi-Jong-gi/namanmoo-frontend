import { RecapUnit } from '../../types/recap';

export class RecapUnitDTO {
  public readonly luckyId: string;
  public readonly startDate: string;
  public readonly endDate: string;
  public readonly luckyStatus: 1 | 2 | 3 | 4;

  constructor(data: RecapUnit) {
    this.luckyId = data.luckyId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.luckyStatus = data.luckyStatus;
  }
}
