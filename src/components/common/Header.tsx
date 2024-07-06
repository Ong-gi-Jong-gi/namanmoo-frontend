import { FiX } from 'react-icons/fi';
const Header = () => {
  return (
    <div className="sticky top-0 mb-6 flex h-14 w-full max-w-[450px] items-center justify-between bg-background">
      <div></div>
      <div>
        <FiX size={36} className="text-gray-50" />
      </div>
    </div>
  );
};

export default Header;
