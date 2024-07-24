import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ChallengeListUnitDto } from '../../apis/dtos/challengeDtos';
import complete from '../../assets/images/complete.svg';
import routes from '../../constants/routes';

const ChallengeListUnit = ({
  challengeId,
  challengeNumber,
  challengeTitle,
  challengeType,
  isComplete,
}: ChallengeListUnitDto) => {
  const navigate = useNavigate();

  const listUnitClassName = clsx(
    `relative flex flex-col justify-between gap-1 rounded-lg border border-secondary-20 bg-secondary-10 px-4 py-2 font-ryurue`,
  );

  const handleUnitClick = () => {
    navigate(`${routes.challenge}/${challengeId}`, {
      state: { type: challengeType },
    });
  };

  return (
    <div className={listUnitClassName} onClick={handleUnitClick}>
      <p className="text-ryurue-sm text-secondary-20">{`#${parseInt(challengeNumber) > 9 ? challengeNumber : '0' + challengeNumber}`}</p>
      <p className="h-full truncate text-ellipsis text-ryurue-base text-black">
        {challengeType.includes('VOICE')
          ? challengeTitle.split('/')[0]
          : challengeTitle}
      </p>
      {isComplete && (
        <div className="absolute right-1 top-1/2 flex h-full -translate-y-1/2 transform items-center">
          <img src={complete} className="h-4/5" />
        </div>
      )}
    </div>
  );
};

export default ChallengeListUnit;
