import { useEffect } from 'react';
import { useGetMyFamilyInfo } from '../apis/family/getMyFamilyInfo';
import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import InviteModal from '../components/main/InviteModal';
import Lucky from '../components/main/Lucky';
import Navbar from '../components/main/Navbar';
import useModalStore from '../store/modalStore';

const MainPage = () => {
  const { data: familyList, isLoading } = useGetMyFamilyInfo();
  const { openModal } = useModalStore();
  useEffect(() => {
    if (familyList?.length == 1) {
      openModal({
        content: <InviteModal code={'OJ348212'} />,
        showCloseBtn: true,
      });
    }
  }, [familyList, openModal]);

  if (isLoading) return <div>Loading...</div>;
  if (!familyList) return <div>가족 정보가 없습니다.</div>;

  // FIXME: width 값 제거 및 레이아웃 적용
  return (
    <div className="h-full w-full">
      <FamilyList familyList={familyList} />
      <Navbar />
      <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
        <Lucky level={4} />
        <ChallengeButton type="active" text="챌린지 시작" />
      </div>
    </div>
  );
};

export default MainPage;
