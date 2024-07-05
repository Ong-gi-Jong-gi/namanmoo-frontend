import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../store/modalStore';
import { UserRole } from '../../types/family';
import Button from '../common/Button';
import FamilyRole from '../familycreate/FamilyRole';

const FamilyEnrollRole = () => {
  const [myRole, setMyRole] = useState<UserRole | ''>('');
  const { closeModal } = useModalStore();
  const naviate = useNavigate();

  const handleCompleteBtn = () => {
    closeModal();
    naviate('/main');
  };

  return (
    <div className="flex flex-col gap-16">
      <div>
        <p className={`font-ryurue text-ryurue-lg`}>역할 선택하기</p>
        <p className="mb-3 font-ryurue text-ryurue-base text-gray-40">
          나는 우리 가족에서 _입니다.
        </p>
        sdasdaaa
      </div>
      <FamilyRole myRole={myRole} setMyRole={setMyRole} />
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
