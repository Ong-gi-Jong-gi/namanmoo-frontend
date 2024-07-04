import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import Lucky from '../components/main/Lucky';

const MainPage = () => {
  // FIXME: width 값 제거 및 레이아웃 적용
  return (
    <div className="h-full w-full">
      <FamilyList />
      <div className="grid h-full w-full grid-rows-[1fr_40%] items-end pt-32">
        <Lucky level={4} />
        <ChallengeButton type="active" text="챌린지 시작" />
      </div>
    </div>
  );
};

export default MainPage;
