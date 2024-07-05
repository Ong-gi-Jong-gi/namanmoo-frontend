import Button from '../common/Button';
import Input from '../common/Input';
import useModalStore from '../../store/modalStore';
import FamilyJoinModal from './FamilyJoinModal';

const FamilyCodeModal = ({ code }: { code: string }) => {
  const { openModal, closeModal } = useModalStore();

  const handleJoinBtn = () => {
    closeModal();

    openModal({
      content: <FamilyJoinModal />,
      showCloseBtn: true,
    });
  };

  return (
    <div className="flex flex-col gap-12 pt-8">
      <Input label="참여코드 입력" isFull={true} value={code} />
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
