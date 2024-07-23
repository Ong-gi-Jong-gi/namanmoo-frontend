import clsx from 'clsx';
import { useEffect } from 'react';
import useBottomSheetStore from '../../store/bottomSheetStore';

const BottomSheetProvider = () => {
  const { isOpen, content } = useBottomSheetStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const bottomSheetStyle = clsx(
    'fixed bottom-0 left-1/2 mx-auto h-fit w-full max-w-[450px] -translate-x-1/2 transform rounded-t-3xl bg-secondary-10 p-5 shadow-shadow-box transition-transform duration-300',
    isOpen
      ? 'translate-y-0 animate-slide-up'
      : 'translate-y-full animate-slide-down',
  );

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 bg-black bg-opacity-30 transition-opacity duration-300',
        { 'opacity-100': isOpen, 'pointer-events-none opacity-0': !isOpen },
      )}
    >
      <div className={bottomSheetStyle}>{content}</div>
    </div>
  );
};

export default BottomSheetProvider;
