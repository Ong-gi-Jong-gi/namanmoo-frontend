import { FaListUl } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import IconButton from '../common/IconButton';

const Navbar = () => {
  const navigate = useNavigate();
  const handleChallengeBtn = () => {
    navigate(routes.challenge);
  };

  return (
    <div className="absolute right-6 top-[200px] flex flex-col gap-2">
      <IconButton
        icon={<FaListUl size={20} />}
        label="챌린지"
        onClick={handleChallengeBtn}
      />
      <IconButton
        theme="subtle"
        icon={<FaQuestion size={20} />}
        label="가이드"
      />
    </div>
  );
};

export default Navbar;
