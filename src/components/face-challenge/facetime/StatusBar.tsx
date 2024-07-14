import clsx from 'clsx';
import { useEffect } from 'react';
import useSocket from '../../../hooks/useSocket';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface StatusBarProps {
  code: string;
}

const StatusBar = ({ code }: StatusBarProps) => {
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { emitChallengeStart, emitLeave, emitDisconnect } = useSocket();
  useEffect(() => {
    if (status === 'finished' && remainingTime <= 0) {
      emitLeave(code);
      emitDisconnect();
    }
  }, [emitLeave, code, remainingTime, status, emitDisconnect]);

  const handleChallengeStart = () => {
    emitChallengeStart(code);
  };
  const renderTime = remainingTime % 10 || 10;

  const timerClass = clsx('w-full text-center font-ryurue text-ryurue-md', {
    'text-white': renderTime > 5,
    'text-red': renderTime <= 5,
  });

  return (
    <div className="bg-black">
      {status === 'idle' && (
        <button
          className="w-full text-center font-ryurue text-ryurue-md text-white"
          onClick={handleChallengeStart}
        >
          챌린지 시작
        </button>
      )}
      {status === 'ongoing' && (
        <p className={timerClass}>{remainingTime % 10 || 10}</p>
      )}
      {status === 'finished' && (
        <p className="w-full text-center font-ryurue text-ryurue-md text-white">
          챌린지 종료
        </p>
      )}
    </div>
  );
};

export default StatusBar;
