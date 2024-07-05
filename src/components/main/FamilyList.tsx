import { useGetMyFamilyInfo } from '../../apis/family/getMyFamilyInfo';
import { separateMyInfo } from '../../utils/separator';
import Profile from '../common/Profile';

// FIXME: 임시로 MAX_FAMILY_MEMBER를 3으로 설정
const MAX_FAMILY_MEMBER = 3;

const FamilyList = () => {
  const { data, isLoading } = useGetMyFamilyInfo();
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>가족 정보가 없습니다.</div>;

  const { myInfo, members: familyList } = separateMyInfo(data);
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
      {familyList?.map((member) => (
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
