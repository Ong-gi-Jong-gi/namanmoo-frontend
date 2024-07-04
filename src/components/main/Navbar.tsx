import { FaListUl } from 'react-icons/fa';
import { FaHeadphones, FaQuestion } from 'react-icons/fa6';
import IconButton from '../common/IconButton';

const Navbar = () => {
  return (
    <div className="absolute right-6 top-[200px] flex flex-col gap-2">
      <IconButton icon={<FaListUl size={20} />} label="챌린지" />
      <IconButton icon={<FaHeadphones size={20} />} label="사서함" />
      <IconButton
        theme="subtle"
        icon={<FaQuestion size={20} />}
        label="가이드"
      />
    </div>
  );
};

export default Navbar;
