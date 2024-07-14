import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useToken,
} from '@livekit/components-react';
import '@livekit/components-styles';
import './translate_none.css';
import { useNavigate } from 'react-router-dom';
import FilterSelector from '../FilterSelector';
import MemoizedCustomVideoConference from './CustomVideoConference';
import StatusBar from './StatusBar';

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
    <div className="flex h-full w-full flex-col">
      <StatusBar code={code} />
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={import.meta.env.VITE_WEBSOCKET_URL}
        className="flex h-full w-full flex-col bg-black"
        data-lk-theme="default"
        onDisconnected={() => {
          navigate('/main');
        }}
      >
        <MemoizedCustomVideoConference />
        <RoomAudioRenderer />
        <FilterSelector />
        <ControlBar
          controls={{
            camera: true,
            microphone: true,
            screenShare: false,
            leave: true,
            chat: false,
          }}
          variation="minimal"
        />
      </LiveKitRoom>
    </div>
  );
};

export default FacetimeContainer;
