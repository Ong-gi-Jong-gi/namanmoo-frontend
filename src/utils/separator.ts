import { ChallengeAnswerDto } from '../apis/dtos/challengeDtos';
import { UserInfo } from '../types/user';
import { getUserId } from './tokenUtils';

interface MyFamilyInfo {
  myInfo: UserInfo | null;
  members: UserInfo[];
}

export const separateMyInfo = (userList: UserInfo[]) => {
  const userId = getUserId();
  return userList.reduce(
    (acc, cur) => {
      if (cur.userId === userId) {
        return { ...acc, myInfo: cur };
      }
      return { ...acc, members: [...acc.members, cur] };
    },
    { myInfo: null, members: [] } as MyFamilyInfo,
  );
};

interface FamilyAnswer {
  myAnswer: ChallengeAnswerDto | null;
  members: ChallengeAnswerDto[];
}

export const separateMyAnswer = (answerList: ChallengeAnswerDto[]) => {
  const userId = getUserId();
  return answerList.reduce(
    (acc, cur) => {
      if (cur.userId === userId) {
        return { ...acc, myAnswer: cur };
      }
      return { ...acc, members: [...acc.members, cur] };
    },
    {
      myAnswer: null,
      members: [],
    } as FamilyAnswer,
  );
};
