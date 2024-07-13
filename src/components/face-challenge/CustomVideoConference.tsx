import { TrackLoop, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useCallback } from 'react';
import { useFacetimeChallengeStore } from '../../store/facetimeChallengeStore';
import Button from '../common/Button';
import CustomParticipantTile from './CustomParticipantTile';

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

const CustomVideoConference = () => {
  const camaraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );
  const { handleChangeStatus, status: challengeStatus } = useChallengeLogic();

  return (
    <>
      <div className="grid h-full min-h-0 w-full min-w-0 grid-cols-2 grid-rows-2 items-center justify-center">
        <TrackLoop tracks={camaraTracks}>
          <CustomParticipantTile />
        </TrackLoop>
      </div>
      {challengeStatus === 'idle' && (
        <Button
          label={`챌린지 시작! - 현재: ${challengeStatus}`}
          onClick={handleChangeStatus}
        />
      )}
    </>
  );
};

const MemoizedCustomVideoConference = React.memo(CustomVideoConference);
export default MemoizedCustomVideoConference;
