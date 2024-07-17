import { useLogout } from '../../apis/auth/logout';
import { useGetUserInfo } from '../../apis/user/getUserInfo';
import { SYS_MESSAGE } from '../../constants/message';
import useModalStore from '../../store/modalStore';
import Button from '../common/Button';
import Header from '../common/Header';
import Profile from '../common/Profile';
import InviteModal from '../main/InviteModal';
import UserInfoEditModal from './UserInfoEditModal';

const UserInfo = () => {
  const { userInfo, isLoading } = useGetUserInfo();
  const { openModal } = useModalStore();
  const { mutate } = useLogout();

  if (isLoading) return <div>Loading...</div>;
  if (!userInfo) return <div>{SYS_MESSAGE.NO_DATA}</div>;

  const handleUserEditModal = () => {
    openModal({
      content: <UserInfoEditModal {...userInfo} />,
      showCloseBtn: true,
    });
  };

  const handleCodeModal = () => {
    openModal({
      content: <InviteModal code={userInfo.code} />,
      showCloseBtn: true,
    });
  };

  const handleLogout = async () => {
    mutate();
  };

  return (
    <div className="flex flex-col gap-5">
      <Header />
      <div className="flex items-center justify-between">
        <Profile
          type={userInfo.userImg ? 'image' : 'default'}
          layout="horizontal"
          userName={userInfo.name}
          userRole={userInfo.role}
          src={userInfo.userImg}
          isText
        />
        <Button label="로그아웃" theme="subtle" onClick={handleLogout} />
      </div>
      <div className="flex gap-3">
        <Button
          label="참여코드 복사"
          type="full"
          size="small"
          theme="neutral"
          onClick={handleCodeModal}
        />
        <Button
          label="프로필 수정"
          type="full"
          size="small"
          onClick={handleUserEditModal}
        />
      </div>
    </div>
  );
};

export default UserInfo;
