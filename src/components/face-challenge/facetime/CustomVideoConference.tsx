import { TrackLoop, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
import useChallengeLogic from '../../../hooks/useChallengeLogin';
import Button from '../../common/Button';
import CustomParticipantTile from './CustomParticipantTile';

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
