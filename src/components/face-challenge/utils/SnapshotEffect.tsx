import clsx from 'clsx';
import { useEffect, useState } from 'react';
import SoundEffect from '../../../assets/sound/capture.mp3';
import FACETIME from '../../../constants/FACETIME';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

const SnapshotEffect = () => {
  const [isSnapshot, setIsSnapshot] = useState(false);
  const { status, remainingTime } = useFacetimeChallengeStore();
  const soundEffect = new Audio(SoundEffect);
  useEffect(() => {
    if (
      status === 'ongoing' &&
      remainingTime !== FACETIME.TIMER_UNIT * FACETIME.PHOTO_COUNT &&
      remainingTime % FACETIME.TIMER_UNIT === 0
    ) {
      setIsSnapshot(true);
      soundEffect.play();

      setTimeout(() => {
        setIsSnapshot(false);
      }, 1000);
    }
  }, [status, remainingTime]);
  const snapshotClass = clsx(
    'absolute left-0 top-0 z-50 h-full w-full bg-white',
    { 'pointer-events-none opacity-0': !isSnapshot },
    { 'animate-flash opacity-80': isSnapshot },
  );
  return <div className={snapshotClass}></div>;
};

export default SnapshotEffect;
