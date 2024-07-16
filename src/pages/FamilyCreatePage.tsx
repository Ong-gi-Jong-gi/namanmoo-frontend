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
    <div className="flex h-full flex-col justify-evenly gap-10">
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
      <div className="flex flex-col gap-3">
        <div>
          <p className={`font-ryurue text-ryurue-base`}>가족 역할</p>
          <p className="font-ryurue text-ryurue-sm text-gray-40">
            나는 우리 가족에서 _입니다.
          </p>
        </div>

        <FamilyRole myRole={myRole} changeRole={setMyRole} />
      </div>
      <span className="mt-3">
        <Button label="가족 생성하기" onClick={handleCreateBtn} type="full" />
      </span>
    </div>
  );
};

export default FamilyCreatePage;
