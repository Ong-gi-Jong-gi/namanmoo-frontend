import { useState } from 'react';
import { usePostJoinFamily } from '../../apis/family/postJoinFamily';
import { SYS_MESSAGE } from '../../constants/message';
import useModalStore from '../../store/modalStore';
import { UserRole } from '../../types/family';
import Button from '../common/Button';
import FamilyRole from '../familycreate/FamilyRole';

interface Props {
  familyId: string;
}

const FamilyEnrollRole = ({ familyId }: Props) => {
  const [myRole, setMyRole] = useState<UserRole | ''>('');
  const { closeModal } = useModalStore();
  const { mutate } = usePostJoinFamily();

  const handleCompleteBtn = () => {
    if (myRole != '') {
      closeModal();
      mutate({ familyId, role: myRole });
    } else {
      alert(SYS_MESSAGE.NO_ROLE);
    }
  };

  const handleRoleBtn = (value: UserRole) => {
    setMyRole(value);
  };

  return (
    <div className="flex flex-col gap-16">
      <div>
        <p className={`font-ryurue text-ryurue-lg`}>역할 선택하기</p>
        <p className="mb-3 font-ryurue text-ryurue-base text-gray-40">
          나는 우리 가족에서 _입니다.
        </p>
      </div>
      <FamilyRole myRole={myRole} changeRole={handleRoleBtn} />
      <Button
        label="완료"
        theme="neutral"
        type="full"
        onClick={handleCompleteBtn}
      />
    </div>
  );
};

export default FamilyEnrollRole;
