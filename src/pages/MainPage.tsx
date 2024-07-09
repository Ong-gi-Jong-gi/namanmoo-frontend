import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMyFamilyInfo } from '../apis/family/getMyFamilyInfo';
import ChallengeSection from '../components/main/ChallengeSection';
import FamilyList from '../components/main/FamilyList';
import InviteModal from '../components/main/InviteModal';
import Navbar from '../components/main/Navbar';
import useModalStore from '../store/modalStore';

const MainPage = () => {
  const params = useParams();

  const { data: familyList, isLoading } = useGetMyFamilyInfo();
  const { openModal } = useModalStore();
  useEffect(() => {
    if (familyList?.length == 1 && params['code']) {
      openModal({
        content: <InviteModal code={params['code']} />,
        showCloseBtn: true,
      });
    }
  }, [familyList, openModal, params]);

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
