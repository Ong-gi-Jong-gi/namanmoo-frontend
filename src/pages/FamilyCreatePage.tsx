import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FamilyRole from '../components/familycreate/FamilyRole';
import { UserRole } from '../types/family';

const FamilyCreatePage = () => {
  const navigate = useNavigate();
  const [myRole, setMyRole] = useState<UserRole | ''>('');
  const code = 'abc'; // TODO: API Call

  const handleCreateBtn = () => {
    navigate(`/main?code=${code}`);
  };
  return (
    <div className="flex h-full flex-col justify-evenly">
      <Select
        label="가족 구성원 수"
        description="우리 가족은 _명 입니다."
        options={[4]}
        value={4}
      />
      <Input
        label="가족 별명"
        description="우리 가족 별명은 _입니다."
        onChange={() => {}}
        isFull={true}
        value={''}
        placeholder="별명"
      />

      <p className={`mb-2 font-ryurue text-ryurue-md`}>가족 역할</p>
      <p className="mb-3 font-ryurue text-ryurue-base text-gray-40">
        나는 우리 가족에서 _입니다.
      </p>
      <FamilyRole myRole={myRole} changeRole={setMyRole} />
      <Button label="가족 생성하기" onClick={handleCreateBtn} type="full" />
    </div>
  );
};

export default FamilyCreatePage;
