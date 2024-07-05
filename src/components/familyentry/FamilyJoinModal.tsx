import clsx from 'clsx';
import useModalStore from '../../store/modalStore';
import Button from '../common/Button';
import Profile from '../common/Profile';
import FamilyEnrollRole from './FamilyEnrollRoleModal';

const FamilyJoinModal = () => {
  const { openModal, closeModal } = useModalStore();
  const familyName = '옹기종기';

  const handleJoinBtn = () => {
    closeModal();

    openModal({
      content: <FamilyEnrollRole />,
      showCloseBtn: true,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-9">
      <div className="flex h-12 w-full items-center justify-center">
        {new Array(4).fill(0).map((_, index: number) => {
          const zIndex = `z-${40 - 10 * index}`;
          return (
            <span
              key={index}
              className={clsx(
                'relative',
                `${zIndex}`,
                `${index ? '-ml-8' : 'ml-0'}`,
              )}
            >
              <Profile />
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
