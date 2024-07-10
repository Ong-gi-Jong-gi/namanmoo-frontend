import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import lucky1 from '../assets/lucky/level1.svg';
import Button from '../components/common/Button';
import FamilyCodeModal from '../components/familyentry/FamilyCodeModal';
import { ServiceConstant } from '../constants/service';
import useModalStore from '../store/modalStore';

const FamilyEntryPage = () => {
  const navigate = useNavigate();
  const { SERVICE_NAME, WELCOME_MESSAGE } = ServiceConstant;
  const [searchParams] = useSearchParams();
  const { openModal } = useModalStore();

  const onClickCreateBtn = () => {
    navigate('/family/create');
  };

  const onClickJoinBtn = () => {
    openModal({
      content: <FamilyCodeModal code={''} />,
      showCloseBtn: false,
    });
  };

  useEffect(() => {
    const code = searchParams.get('code');

    if (code)
      openModal({
        content: <FamilyCodeModal code={code} />,
        showCloseBtn: false,
      });
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-between text-center">
      <div>
        <p className="mt-[120px] font-ryurue text-ryurue-lg">{SERVICE_NAME}</p>
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
