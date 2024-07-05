import { useEffect, useState } from 'react';
import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import InviteModal from '../components/main/InviteModal';
import Lucky from '../components/main/Lucky';
import useModalStore from '../store/modalStore';

const MainPage = () => {
  // TODO: 가족 API 조회 수 사용자 수에 따라
  const [familyCount, setFamilyCount] = useState(1);
  const { openModal } = useModalStore();

  useEffect(() => {
    console.log(1);
    if (familyCount == 1) {
      console.log(1);
      openModal({
        content: <InviteModal code={'OJ348212'} />,
        showCloseBtn: true,
      });
    }
  }, [familyCount, openModal]);

  // FIXME: width 값 제거 및 레이아웃 적용
  return (
    <div className="h-full w-full">
      <FamilyList />
      <div className="grid h-full w-full grid-rows-[1fr_40%] items-end pt-32">
        <Lucky level={4} />
        <ChallengeButton />
      </div>
    </div>
  );
};

export default MainPage;
