import { TrackLoop, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import React from 'react';
import HTML2Canvas from '../utils/ScreenCapturer';
import CustomParticipantTile from './CustomParticipantTile';

const CustomVideoConference = () => {
  const camaraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );

  return (
    <>
      <HTML2Canvas>
        <div className="grid h-full min-h-0 w-full min-w-0 grid-cols-2 grid-rows-2 items-center justify-center">
          <TrackLoop tracks={camaraTracks}>
            <CustomParticipantTile />
          </TrackLoop>
        </div>
      </HTML2Canvas>
    </>
  );
};

const MemoizedCustomVideoConference = React.memo(CustomVideoConference);
export default MemoizedCustomVideoConference;
