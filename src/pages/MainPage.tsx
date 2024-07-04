import ChallengeButton from '../components/main/ChallengeButton';
import FamilyList from '../components/main/FamilyList';
import Lucky from '../components/main/Lucky';
import Navbar from '../components/main/Navbar';

const MainPage = () => {
  return (
    <div className="h-full w-full">
      <FamilyList />
      <Navbar />
      <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
        <Lucky level={4} />
        <ChallengeButton type="active" text="챌린지 시작" />
      </div>
    </div>
  );
};

export default MainPage;
