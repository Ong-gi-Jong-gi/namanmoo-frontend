import { ChallengeAnswerDto } from '../apis/dtos/challengeDtos';
import { UserInfo } from '../types/user';

// FIXME: 현재 로그인한 유저 id를 어떻게 가져올지 결정해야 함
const userId = 'wer122a';
interface MyFamilyInfo {
  myInfo: UserInfo | null;
  members: UserInfo[];
}

export const separateMyInfo = (userList: UserInfo[]) => {
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
