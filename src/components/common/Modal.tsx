import { IoClose } from 'react-icons/io5';
import useModalStore from '../../store/modalStore';

const ModalProvider = () => {
  const { isOpen, content, showCloseBtn, closeModal } = useModalStore();
  console.log(isOpen);

  if (!isOpen) {
    console.log(11111);
    return null;
  }

  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-10">
      <div
        className={`bg-background relative max-h-full w-4/5 max-w-sm overflow-auto rounded-3xl p-10`}
      >
        {content}
        {showCloseBtn && (
          <button
            className="absolute right-4 top-4 text-gray-50"
            onClick={closeModal}
          >
            <IoClose size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalProvider;
