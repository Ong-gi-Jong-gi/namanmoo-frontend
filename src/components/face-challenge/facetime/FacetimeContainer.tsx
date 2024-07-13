import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useToken,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import FilterSelector from '../FilterSelector';
import MemoizedCustomVideoConference from './CustomVideoConference';

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
      <MemoizedCustomVideoConference />
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
export default FacetimeContainer;
