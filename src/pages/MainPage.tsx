import QueryString from 'qs';
import { useEffect } from 'react';
import { useGetMyFamilyInfo } from '../apis/family/getMyFamilyInfo';
import ChallengeSection from '../components/main/ChallengeSection';
import FamilyList from '../components/main/FamilyList';
import InviteModal from '../components/main/InviteModal';
import Navbar from '../components/main/Navbar';
import useModalStore from '../store/modalStore';

const MainPage = () => {
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { data: familyList, isLoading } = useGetMyFamilyInfo();
  const { openModal } = useModalStore();
  useEffect(() => {
    if (familyList?.length == 1 && queryData['code']) {
      openModal({
        content: <InviteModal code={queryData['code'] as string} />,
        showCloseBtn: true,
      });
    }
  }, [familyList, openModal]);

  if (isLoading) return <div>가족 정보 Loading...</div>;
  if (!familyList) return <div>가족 정보가 없습니다.</div>;

  return (
    <div className="h-full w-full">
      <FamilyList familyList={familyList} />
      <Navbar />
      <ChallengeSection currentFamilySize={familyList.length} />
    </div>
  );
};

export default MainPage;
