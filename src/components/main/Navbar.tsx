import { FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import IconButton from '../common/IconButton';
const Navbar = () => {
  const navigate = useNavigate();
  const handleChallengeBtn = () => {
    navigate(routes.challenge);
  };

  return (
    <div className="absolute right-6 top-1/4 z-10 flex flex-col gap-2">
      <IconButton
        icon={<FaListUl size={20} />}
        label="챌린지"
        onClick={handleChallengeBtn}
      />
    </div>
  );
};

export default Navbar;
