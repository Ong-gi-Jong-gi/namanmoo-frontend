import { RecapUnit, YouthRecap } from '../../types/recap';

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

export class YouthRecapDTO {
  public readonly photoUrl: string;
  public readonly text: string;

  constructor(data: YouthRecap) {
    this.photoUrl = data.photo;
    this.text = data.text;
  }
}
