import { FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 flex w-full max-w-[450px] items-center justify-between bg-background py-6">
      <div></div>
      <div>
        <FiX size={32} className="text-gray-50" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default Header;
