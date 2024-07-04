import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import Lucky from '../components/main/Lucky';

const MainPage = () => {
  // FIXME: width 값 제거 및 레이아웃 적용
  return (
    <div className="bg-main h-[844px] w-[390px] bg-contain bg-center bg-no-repeat">
      <FamilyList />
      <Lucky level={2} />
      <ChallengeButton type="ongoing" text="챌린지 시작" day={12} />
    </div>
  );
};

export default MainPage;
