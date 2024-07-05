import { MAX_FAMILY_MEMBER } from '../../constants/family';
import { UserInfo } from '../../types/user';
import { separateMyInfo } from '../../utils/separator';
import Profile from '../common/Profile';

interface FamilyListProps {
  familyList: UserInfo[];
}

const FamilyList = ({ familyList }: FamilyListProps) => {
  const { myInfo, members } = separateMyInfo(familyList);
  const disabledCount = Math.max(0, MAX_FAMILY_MEMBER - familyList.length);

  return (
    <div className="scrollbar-hide absolute left-0 inline-flex h-32 w-full items-center gap-5 overflow-x-scroll px-6">
      {/* My Profile */}
      <Profile
        type={myInfo?.userImg ? 'image' : 'default'}
        src={myInfo?.userImg}
        userName="나"
        userRole={myInfo?.role}
        isText
      />
      <div className="h-16 border-l-2 border-gray-30" />
      {/* Family Profiles */}
      {members?.map((member) => (
        <Profile
          key={member.userId}
          type={member.userImg ? 'image' : 'default'}
          userName={member.nickname}
          userRole={member.role}
          src={member.userImg}
          isText
        />
      ))}
      {/* Disabled Profiles */}
      {Array(disabledCount)
        .fill(null)
        .map((_, idx) => (
          <Profile key={`disabled-${idx}`} type="disabled" isText />
        ))}
    </div>
  );
};

export default FamilyList;
