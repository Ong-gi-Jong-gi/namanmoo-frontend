import { useNavigate } from 'react-router-dom';
import lucky1 from '../assets/lucky/level1.svg';
import Button from '../components/common/Button';
import { ServiceConstant } from '../constants/service';

const FamilyEntryPage = () => {
  const navigate = useNavigate();
  const { SERVICE_NAME, WELCOME_MESSAGE } = ServiceConstant;

  const onClickCreateBtn = () => {
    navigate('/family/create');
  };

  const onClickJoinBtn = () => {};

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between px-12 py-10 text-center">
      <div>
        <p className="font-ryurue text-ryurue-lg mt-[120px]">{SERVICE_NAME}</p>
        <p className="font-ryurue text-ryurue-base">{WELCOME_MESSAGE}</p>
      </div>
      <img src={lucky1} alt="lucky-ground" className="w-4/5" />
      <div className="flex w-full flex-col gap-5">
        <Button label="가족 생성하기" type="full" onClick={onClickCreateBtn} />
        <Button
          label="가족 참여하기"
          type="full"
          theme="subtle"
          onClick={onClickJoinBtn}
        />
      </div>
    </div>
  );
};

export default FamilyEntryPage;
