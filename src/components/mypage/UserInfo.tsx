import { useGetUserInfo } from '../../apis/user/getUserInfo';
import { SYS_MESSAGE } from '../../constants/message';
import useModalStore from '../../store/modalStore';
import Button from '../common/Button';
import Header from '../common/Header';
import Profile from '../common/Profile';
import UserInfoEditModal from './UserInfoEditModal';

const UserInfo = () => {
  const { userInfo, isLoading } = useGetUserInfo();
  const { openModal } = useModalStore();

  if (isLoading) return <div>Loading...</div>;
  if (!userInfo) return <div>{SYS_MESSAGE.NO_DATA}</div>;

  const handleUserEditModal = () => {
    openModal({
      content: <UserInfoEditModal {...userInfo} />,
      showCloseBtn: false,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Header />
      <Profile
        type="default"
        layout="horizontal"
        userName={userInfo.name}
        userRole={userInfo.role}
        // TODO: 이미지 확인 필요
        src={userInfo.userImg}
        isText
      />
      <Button
        label="프로필 수정"
        type="full"
        size="small"
        onClick={handleUserEditModal}
      />
    </div>
  );
};

export default UserInfo;
