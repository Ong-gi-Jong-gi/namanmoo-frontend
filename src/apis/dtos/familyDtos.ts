import {
  CreateFamilyResponse,
  GetFamilyInfoResponse,
} from '../../types/family';

export class FamilyCodeDto {
  public readonly code: string;

  constructor(data: CreateFamilyResponse) {
    this.code = data.code;
  }
}

export class FamilyInfoDto {
  public readonly familyName;
  public readonly familyId;
  public readonly members;

  constructor(data: GetFamilyInfoResponse) {
    this.familyName = data.familyName;
    this.familyId = data.familyId;
    this.members = data.members;
  }
}
