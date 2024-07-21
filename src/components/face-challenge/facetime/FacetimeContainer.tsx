import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useToken,
} from '@livekit/components-react';
import '@livekit/components-styles';
import './translate_none.css';
import FACETIME from '../../../constants/FACETIME';
import FilterSelector from '../utils/FilterSelector';
import SnapshotEffect from '../utils/SnapshotEffect';
import MemoizedCustomVideoConference from './CustomVideoConference';
import StatusBar from './StatusBar';

interface FacetimeContainerProps {
  code: string;
}

const FacetimeContainer = ({ code }: FacetimeContainerProps) => {
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
      <SnapshotEffect />
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={import.meta.env.VITE_WEBSOCKET_URL}
        className="flex h-full w-full flex-col bg-black"
        onDisconnected={() => {
          location.reload();
        }}
      >
        <StatusBar code={code} />
        <MemoizedCustomVideoConference />
        <RoomAudioRenderer />
        <FilterSelector />
        <ControlBar
          data-lk-theme="default"
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
