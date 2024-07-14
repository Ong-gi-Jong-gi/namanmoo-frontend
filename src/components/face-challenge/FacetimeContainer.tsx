import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  TrackLoop,
  useToken,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import CustomParticipantTile from './CustomParticipantTile';
import FilterSelector from './FilterSelector';
import HTML2Canvas from './HTML2Canvas';

interface FacetimeContainerProps {
  code: string;
}

const FacetimeContainer = ({ code }: FacetimeContainerProps) => {
  const navigate = useNavigate();
  const token = useToken(
    `${import.meta.env.VITE_NODE_API_URL}/getToken`,
    code,
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
      <HTML2Canvas>
        <MyVideoConference />
      </HTML2Canvas>

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
      <FilterSelector />
      <Button
        onClick={() => {
          navigate('/main');
        }}
        label="나가기"
        theme="primary"
      />
    </LiveKitRoom>
  );
};

function MyVideoConference() {
  const camaraTracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { onlySubscribed: false },
  );

  return (
    <div className="grid h-full min-h-0 w-full min-w-0 grid-cols-2 grid-rows-2 items-center justify-center">
      <TrackLoop tracks={camaraTracks}>
        <CustomParticipantTile />
      </TrackLoop>
    </div>
  );
}
export default FacetimeContainer;
