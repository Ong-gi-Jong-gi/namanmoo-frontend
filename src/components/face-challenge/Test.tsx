import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useToken,
  useTrackRefContext,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import FaceFilter from './FaceFilter';

export default function Test() {
  const token = useToken(
    `${import.meta.env.VITE_NODE_API_URL}/getToken`,
    'testRoom',
    {
      userInfo: {
        identity: `${localStorage.getItem('lkName')}`,
        name: `${localStorage.getItem('lkName')}`,
      },
    },
  );

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={import.meta.env.VITE_WEBSOCKET_URL}
      className="h-full w-full"
      data-lk-theme="default"
    >
      <MyVideoConference />
      <RoomAudioRenderer />
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
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} className="h-full w-full">
      <MyParticipantTile />
    </GridLayout>
  );
}

function MyParticipantTile() {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant.identity === localStorage.getItem('lkName');
  const isMuted = trackRef.publication?.track?.isMuted;

  return (
    <div className="relative h-fit w-fit">
      <ParticipantTile />
      {isUser && !isMuted && <FaceFilter />}
    </div>
  );
}
