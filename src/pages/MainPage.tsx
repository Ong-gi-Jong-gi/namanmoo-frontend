import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import Lucky from '../components/main/Lucky';

const MainPage = () => {
  // FIXME: width 값 제거 및 레이아웃 적용
  return (
    <div className="h-full w-full">
      <FamilyList />
      <div className="grid h-full w-full grid-rows-[1fr_140px] items-end pt-32">
        <Lucky level={1} />
        <ChallengeButton />
      </div>
    </div>
  );
};

export default MainPage;
