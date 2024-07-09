import { ChangeEvent, useEffect, useState } from 'react';
import { useGetFamilyInfo } from '../../apis/family/getFamilyInfo';
import useModalStore from '../../store/modalStore';
import Button from '../common/Button';
import Input from '../common/Input';
import FamilyJoinModal from './FamilyJoinModal';

const FamilyCodeModal = ({ code }: { code: string }) => {
  const { openModal, closeModal } = useModalStore();
  const [enabled, setEnabled] = useState(false);
  const [inviteCode, setInviteCode] = useState(code);
  const { hasData, familyId, familyName, members, error } = useGetFamilyInfo(
    { code: inviteCode },
    enabled,
  );

  const handleJoinBtn = () => {
    setEnabled(true);
    if (hasData) {
      moveNextModal();
    }
  };

  const moveNextModal = () => {
    closeModal();

    openModal({
      content: (
        <FamilyJoinModal
          familyId={familyId}
          familyName={familyName}
          members={members}
        />
      ),
      showCloseBtn: true,
    });
  };

  const handleInviteCode = (e: ChangeEvent<HTMLInputElement>) => {
    setInviteCode(e.target.value);
  };

  useEffect(() => {
    if (hasData) moveNextModal();
  }, [hasData]);

  return (
    <div className="flex flex-col gap-12 pt-8">
      <Input
        label="참여코드 입력"
        isFull={true}
        value={code}
        inputCase={error ? 'error' : 'normal'}
        message={error ? error.message : ''}
        onChange={handleInviteCode}
      />
      <Button
        label={'참여'}
        theme="neutral"
        type="full"
        onClick={handleJoinBtn}
      />
    </div>
  );
};

export default FamilyCodeModal;
