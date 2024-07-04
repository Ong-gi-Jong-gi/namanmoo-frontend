import { IoClose } from 'react-icons/io5';
import useModalStore from '../../store/modalStore';

const ModalProvider = () => {
  const { isOpen, content, showCloseBtn, closeModal } = useModalStore();

  if (!isOpen) {
    return null;
  }

  const handleCloseBtn = () => {
    closeModal();
  };

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-8">
      <div
        className={`bg-background relative max-h-full w-4/5 max-w-sm overflow-auto rounded-3xl p-10`}
      >
        {content}
        {showCloseBtn && (
          <button
            className="absolute right-4 top-4 text-gray-50"
            onClick={handleCloseBtn}
          >
            <IoClose size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalProvider;
