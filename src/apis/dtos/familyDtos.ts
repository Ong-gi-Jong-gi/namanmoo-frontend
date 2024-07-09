import { CreateFamilyResponse } from '../../types/family';

export class FamilyCodeDto {
  public readonly code: string;

  constructor(data: CreateFamilyResponse) {
    this.code = data.code;
  }
}
