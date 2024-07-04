import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import Lucky from '../components/main/Lucky';

const MainPage = () => {
  // FIXME: width 값 제거 및 레이아웃 적용
  return (
    <div className="w-[288px]">
      <FamilyList />
      <Lucky level={1} />
      <Lucky level={2} />
      <Lucky level={3} />
      <Lucky level={4} />
      <ChallengeButton />
    </div>
  );
};

export default MainPage;
