import { ChangeEvent, useState } from 'react';
import { useCreateFamily } from '../apis/family/postCreateFamily';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FamilyRole from '../components/familycreate/FamilyRole';
import { FAMILY_SIZE } from '../constants/family';
import { UserRole } from '../types/family';

const FamilyCreatePage = () => {
  const [familySize, setFamilySize] = useState<number>(
    FAMILY_SIZE.DEFAULT_SIZE,
  );
  const [familyName, setFamilyName] = useState<string>('');
  const [myRole, setMyRole] = useState<UserRole | ''>('');
  const { mutate } = useCreateFamily();

  const handleCreateBtn = () => {
    mutate({ familyName, familySize, ownerRole: myRole });
  };

  const handleFamilySize = (e: ChangeEvent<HTMLSelectElement>) => {
    setFamilySize(parseInt(e.target.value));
  };

  const handleFamilyName = (e: ChangeEvent<HTMLInputElement>) => {
    setFamilyName(e.target.value);
  };

  return (
    <div className="flex h-full flex-col justify-evenly">
      <Select
        label="가족 구성원 수"
        description="우리 가족은 _명 입니다."
        options={[familySize]}
        value={familySize}
        onChange={handleFamilySize}
      />
      <Input
        label="가족 별명"
        description="우리 가족 별명은 _입니다."
        onChange={handleFamilyName}
        isFull={true}
        value={familyName}
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
