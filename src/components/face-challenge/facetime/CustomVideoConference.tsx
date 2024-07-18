import { TrackLoop, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
import CustomParticipantTile from './CustomParticipantTile';

const CustomVideoConference = () => {
  const camaraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );

  return (
    <>
      <div className="grid h-full min-h-0 w-full min-w-0 grid-cols-2 grid-rows-2 items-center justify-center gap-2 overflow-hidden">
        <TrackLoop tracks={camaraTracks}>
          <CustomParticipantTile />
        </TrackLoop>
      </div>
    </>
  );
};

const MemoizedCustomVideoConference = React.memo(CustomVideoConference);
export default MemoizedCustomVideoConference;
