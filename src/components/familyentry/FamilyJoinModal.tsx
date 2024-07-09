import clsx from 'clsx';
import useModalStore from '../../store/modalStore';
import { UserInfo } from '../../types/user';
import Button from '../common/Button';
import Profile from '../common/Profile';
import FamilyEnrollRole from './FamilyEnrollRoleModal';

interface Props {
  familyId: string;
  familyName: string;
  members: UserInfo[];
}

const FamilyJoinModal = ({ familyId, familyName, members }: Props) => {
  const { openModal, closeModal } = useModalStore();

  const handleJoinBtn = () => {
    closeModal();

    openModal({
      content: <FamilyEnrollRole familyId={familyId} />,
      showCloseBtn: true,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-9">
      <div className="flex h-12 w-full items-center justify-center">
        {members.map((member: UserInfo, index: number) => {
          const zIndex = `z-${40 - 10 * index}`;
          return (
            <span
              key={member.userId}
              className={clsx(
                'relative',
                `${zIndex}`,
                `${index ? '-ml-8' : 'ml-0'}`,
              )}
            >
              <Profile
                type={member.userImg ? 'image' : 'default'}
                src={member.userImg}
              />
            </span>
          );
        })}
      </div>
      <p className="font-ryurue text-ryurue-lg">{familyName}</p>
      <div className="flex w-full gap-4">
        <Button label="취소" theme="subtle" type="full" onClick={() => {}} />
        <Button
          label="참여"
          theme="neutral"
          type="full"
          onClick={handleJoinBtn}
        />
      </div>
    </div>
  );
};

export default FamilyJoinModal;
