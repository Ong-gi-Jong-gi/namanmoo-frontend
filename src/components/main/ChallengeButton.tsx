import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

interface BaseChallengeButtonProps {
  text: string;
}

interface ActiveChallengeButtonProps extends BaseChallengeButtonProps {
  type: 'active';
}

interface DisabledChallengeButtonProps extends BaseChallengeButtonProps {
  type: 'disabled';
  familySize: number;
  currentSize: number;
}

interface OngoingChallengeButtonProps extends BaseChallengeButtonProps {
  type: 'ongoing';
  day: string;
  challengeId: string;
}

type ChallengeButtonProps =
  | ActiveChallengeButtonProps
  | DisabledChallengeButtonProps
  | OngoingChallengeButtonProps;

const adjustFontSize = (text: string) => {
  return text.length > 10 ? 'text-ryurue-base' : 'text-ryurue-md';
};

const renderTypeInfo = (props: ChallengeButtonProps) => {
  switch (props.type) {
    case 'ongoing':
      return (
        <>
          <span className="text-ryurue-sm">Day</span>
          <span className="mx-2 text-ryurue-base text-red">{props.day}</span>
        </>
      );
    case 'disabled':
      return (
        <span className="text-gray-40">
          ( {props.currentSize} / {props.familySize} )
        </span>
      );
    default:
      return null;
  }
};

const ChallengeButton = (props: ChallengeButtonProps) => {
  const { type, text } = props;
  const navigate = useNavigate();

  const layoutClass = clsx(
    'h-32 w-full items-center justify-center gap-2 rounded-md bg-paper bg-contain px-9 py-5 font-ryurue shadow',
    {
      flex: type === 'active',
      'grid grid-rows-[24px_1fr]': type !== 'active',
      'cursor-pointer': type !== 'disabled',
    },
  );
  const textClass = clsx(
    'line-clamp-2 text-pretty break-words',
    adjustFontSize(text),
    { 'text-gray-40': type === 'disabled' },
  );

  const handleClick = () => {
    if (type === 'active') {
      console.log('챌린지 시작 API 요청');
    }
    if (type === 'ongoing') {
      navigate(`${routes.challenge}/${props.challengeId}`);
    }
  };

  return (
    <button
      className={layoutClass}
      onClick={handleClick}
      disabled={type === 'disabled'}
    >
      <div className="flex items-center justify-center">
        {renderTypeInfo(props)}
      </div>
      <span className={textClass}>{text}</span>
    </button>
  );
};

export default ChallengeButton;
