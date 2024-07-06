import { FiX } from 'react-icons/fi';
const Header = () => {
  return (
    <div className="sticky top-0 flex w-full max-w-[450px] items-center justify-between bg-background py-6">
      <div></div>
      <div>
        <FiX size={32} className="text-gray-50" />
      </div>
    </div>
  );
};

export default Header;
