import { FaListUl } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
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
    const ONE_DAY_MILI_SEC = 86400000;
    const challengeStartDate = localStorage.getItem('challengeStartDate');
    const challengeDate = localStorage.getItem('challengeDate');

    if (challengeDate && challengeStartDate) {
      const startDate = parseInt(challengeStartDate);
      const nowDate = parseInt(challengeDate);

      const passDays = (nowDate - startDate) / ONE_DAY_MILI_SEC;

      console.log(passDays);

      if (passDays == 0) {
        localStorage.setItem(
          'challengeDate',
          `${nowDate + ONE_DAY_MILI_SEC * 14}`,
        );
      } else if (passDays == 14) {
        localStorage.setItem(
          'challengeDate',
          `${nowDate + ONE_DAY_MILI_SEC * 15}`,
        );
      } else {
        localStorage.setItem('challengeDate', `${nowDate + ONE_DAY_MILI_SEC}`);
      }

      window.location.reload();
    }
  };

  const handleResetDay = () => {
    const challengeStartDate = localStorage.getItem('challengeStartDate');

    if (challengeStartDate)
      localStorage.setItem('challengeDate', challengeStartDate);
    window.location.reload();
  };

  return (
    <div className="absolute right-6 top-1/4 z-10 flex flex-col gap-2">
      <IconButton
        icon={<FaListUl size={20} />}
        label="챌린지"
        onClick={handleChallengeBtn}
      />
      <IconButton
        theme="subtle"
        icon={<TbPlayerTrackNextFilled size={20} />}
        label="다음"
        onClick={handleDayChange}
      />
      <IconButton
        theme="subtle"
        icon={<GrPowerReset size={20} />}
        label="초기화"
        onClick={handleResetDay}
      />
    </div>
  );
};

export default Navbar;
