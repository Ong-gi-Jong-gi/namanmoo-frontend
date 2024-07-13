import { useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useCallback } from 'react';
import { useFacetimeChallengeStore } from '../store/facetimeChallengeStore';

const useChallengeLogic = () => {
  const { status, setStatus } = useFacetimeChallengeStore();
  const camaraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );
  const handleStartChallenge = useCallback(() => {
    if (status !== 'idle') return;
    if (camaraTracks.length < 2) {
      alert('가족들이 모두 참여해야 합니다.');
      return;
    }
    setStatus('ongoing');
  }, [status, camaraTracks, setStatus]);

  const handleChangeStatus = useCallback(() => {
    if (status === 'idle') {
      handleStartChallenge();
      return;
    }

    if (status === 'ongoing') {
      setStatus('finished');
      return;
    }
  }, [status, handleStartChallenge, setStatus]);

  return { handleChangeStatus, camaraTracks, status };
};
export default useChallengeLogic;
