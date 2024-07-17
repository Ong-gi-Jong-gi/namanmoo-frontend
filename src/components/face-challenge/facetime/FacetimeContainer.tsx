import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useToken,
} from '@livekit/components-react';
import '@livekit/components-styles';
import './translate_none.css';
import { useNavigate } from 'react-router-dom';
import FACETIME from '../../../constants/FACETIME';
import routes from '../../../constants/routes';
import FilterSelector from '../utils/FilterSelector';
import SnapshotEffect from '../utils/SnapshotEffect';
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
        identity: `${localStorage.getItem(FACETIME.LOCAL_STORAGE_KEY)}`,
        name: `${localStorage.getItem(FACETIME.LOCAL_STORAGE_KEY)}`,
      },
    },
  );

  return (
    <div className="flex h-[calc(100%-80px)] w-full flex-col">
      <StatusBar code={code} />
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={import.meta.env.VITE_WEBSOCKET_URL}
        className="flex h-full w-full flex-col bg-black"
        data-lk-theme="default"
        onDisconnected={() => {
          navigate(routes.main);
        }}
      >
        <SnapshotEffect />
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
          className="p-1"
        />
      </LiveKitRoom>
    </div>
  );
};

export default FacetimeContainer;
