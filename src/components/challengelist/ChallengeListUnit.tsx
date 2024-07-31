import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeListUnitDto } from '../../apis/dtos/challengeDtos';
import complete from '../../assets/images/complete.svg';
import { CHALLENGE_COLOR } from '../../constants/CHALLENGE';
import routes from '../../constants/routes';
import Badge from '../common/Badge';

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

  const formattedType = useMemo(() => {
    if (challengeType.includes('GROUP_')) return 'GROUP';
    else if (challengeType.includes('VOICE')) return 'VOICE';
    else return challengeType;
  }, [challengeType]);

  return (
    <div className={listUnitClassName} onClick={handleUnitClick}>
      <div className="flex items-center gap-4">
        <p className="text-ryurue-base text-secondary-20">{`#${parseInt(challengeNumber) > 9 ? challengeNumber : '0' + challengeNumber}`}</p>
        <Badge text={formattedType} color={CHALLENGE_COLOR[formattedType]} />
      </div>
      <p className="h-full truncate text-ellipsis text-ryurue-base">
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
