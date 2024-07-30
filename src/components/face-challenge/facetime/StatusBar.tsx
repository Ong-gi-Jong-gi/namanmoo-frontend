import { useTracks } from '@livekit/components-react';
import clsx from 'clsx';
import { Track } from 'livekit-client';
import FACETIME from '../../../constants/FACETIME';
import { MAX_FAMILY_MEMBER } from '../../../constants/family';
import useSocket from '../../../hooks/useSocket';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface StatusBarProps {
  code: string;
}

const StatusBar = ({ code }: StatusBarProps) => {
  const camaraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { emitChallengeStart } = useSocket();

  const handleClickStart = () => {
    if (camaraTracks.length < MAX_FAMILY_MEMBER) {
      alert('가족들이 모두 참여해야 합니다.');
      return;
    }

    confirm('챌린지를 시작하시겠습니까?') && emitChallengeStart(code);
  };
  const renderTime = remainingTime % FACETIME.TIMER_UNIT || FACETIME.TIMER_UNIT;

  const timerClass = clsx('w-full text-center font-ryurue text-ryurue-md', {
    'text-white': renderTime > FACETIME.TIMER_UNIT / 2,
    'text-red': renderTime <= FACETIME.TIMER_UNIT / 2,
  });

  return (
    <div className="bg-black">
      {status === 'idle' && (
        <button
          className="w-full text-center font-ryurue text-ryurue-md text-white"
          onClick={handleClickStart}
        >
          인생네컷 시작
        </button>
      )}
      {status === 'ongoing' && (
        <p className={timerClass}>
          {remainingTime % FACETIME.TIMER_UNIT || FACETIME.TIMER_UNIT}
        </p>
      )}
      {status === 'finished' && (
        <p className="w-full text-center font-ryurue text-ryurue-md text-white">
          인생네컷 종료
        </p>
      )}
    </div>
  );
};

export default StatusBar;
