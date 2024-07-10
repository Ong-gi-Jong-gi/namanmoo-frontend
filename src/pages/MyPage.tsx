import CompleteRecapList from '../components/mypage/CompleteRecapList';
import UserInfo from '../components/mypage/UserInfo';

const MyPage = () => {
  return (
    <div className="flex h-full flex-col gap-16">
      <UserInfo />
      <CompleteRecapList />
    </div>
  );
};

export default MyPage;
