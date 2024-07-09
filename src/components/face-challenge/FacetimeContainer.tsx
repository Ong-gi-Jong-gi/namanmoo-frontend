import {
  ControlBar,
  LiveKitRoom,
  ParticipantTile,
  TrackLoop,
  useToken,
  useTrackRefContext,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import PrejoinCam from './PrejoinFaceFilter';

const FacetimeContainer = () => {
  const token = useToken(
    `${import.meta.env.VITE_NODE_API_URL}/getToken`,
    'testRoom',
    {
      userInfo: {
        identity: `${localStorage.getItem('mooluck-nickname')}`,
        name: `${localStorage.getItem('mooluck-nickname')}`,
      },
    },
  );

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={import.meta.env.VITE_WEBSOCKET_URL}
      className="flex h-full w-full flex-col"
      data-lk-theme="default"
    >
      <MyVideoConference />
      <ControlBar
        controls={{
          camera: true,
          microphone: true,
          screenShare: false,
          leave: false,
          chat: false,
        }}
        variation="minimal"
      />
    </LiveKitRoom>
  );
};

function MyVideoConference() {
  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );

  return (
    <div className="grid h-full min-h-0 w-full min-w-0 grid-cols-2 grid-rows-2 items-center justify-center">
      <TrackLoop tracks={tracks}>
        <MyParticipantTile />
      </TrackLoop>
    </div>
  );
}

function MyParticipantTile() {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant.identity === localStorage.getItem('mooluck-nickname');
  const isMuted = trackRef.publication?.track?.isMuted;

  return (
    <div className="flex h-full w-full items-center">
      <ParticipantTile hidden={isUser && !isMuted} />
      {isUser && !isMuted && <PrejoinCam />}
    </div>
  );
}

export default FacetimeContainer;
