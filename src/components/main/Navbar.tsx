import { FaListUl } from 'react-icons/fa';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import IconButton from '../common/IconButton';

const Navbar = () => {
  const navigate = useNavigate();
  const handleChallengeBtn = () => {
    navigate(routes.challenge);
  };

  const handleDayChange = () => {
    const challengeDate = localStorage.getItem('challengeDate');

    if (challengeDate) {
      const newDate = parseInt(challengeDate) + 86400000;
      localStorage.setItem('challengeDate', `${newDate}`);
      window.location.reload();
    }
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
        icon={<TbPlayerTrackNextFilled size={20} />}
        label="내일로"
        onClick={handleDayChange}
      />
    </div>
  );
};

export default Navbar;
