import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useCreateChallenge } from '../../apis/challenge/postCreateChallenge';
import routes from '../../constants/routes';
import { ChallengeType } from '../../types/challenge';

interface BaseChallengeButtonProps {
  text: string;
  theme?: string;
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
  theme: ChallengeType;
}

type ChallengeButtonProps =
  | ActiveChallengeButtonProps
  | DisabledChallengeButtonProps
  | OngoingChallengeButtonProps;

const adjustFontSize = (text: string) => {
  return text.length > 10
    ? 'xs:text-ryurue-base text-ryurue-sm'
    : ' xs:text-ryurue-md text-ryurue-base';
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
        <span className="text-ryurue-sm text-gray-40">
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
  const { mutate } = useCreateChallenge();

  const layoutClass = clsx(
    'shadow h-32 w-full items-center justify-center gap-4 rounded-md bg-paper bg-contain px-9 py-5 font-ryurue',
    {
      flex: type === 'active',
      'grid grid-rows-[24px_1fr]': type !== 'active',
      'cursor-pointer': type !== 'disabled',
    },
  );
  const textClass = clsx(
    'line-clamp-1 text-pretty break-keep',
    adjustFontSize(text),
    { 'text-gray-40': type === 'disabled' },
  );

  const handleClick = async () => {
    if (type === 'active') {
      mutate();
    }
    if (type === 'ongoing') {
      navigate(`${routes.challenge}/${props.challengeId}`, {
        state: {
          type: props.theme,
        },
      });
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
