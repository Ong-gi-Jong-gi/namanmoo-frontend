import useBottomSheetStore from '../../store/bottomSheetStore';

const BottomSheetProvider = () => {
  const { isOpen, content } = useBottomSheetStore();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-40 h-full w-full bg-gray-20 bg-opacity-50">
      <div className="absolute bottom-0 left-1/2 mx-auto h-fit w-full max-w-[450px] -translate-x-1/2 transform animate-slide-up rounded-t-3xl bg-secondary-10 p-5 shadow-shadow-box">
        {content}
      </div>
    </div>
  );
};

export default BottomSheetProvider;
