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
import { useEffect } from 'react';
import useFaceLandmarkerStore from '../../store/faceLandmarkerStore';
import { loadFaceLandmarker } from '../../utils/loadModel';
import FaceFilter from './FaceFilter';

const FacetimeContainer = () => {
  const { setFaceLandmarker } = useFaceLandmarkerStore();

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

  useEffect(() => {
    loadFaceLandmarker().then((model) => {
      setFaceLandmarker(model);
    });
  }, [setFaceLandmarker]);

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
    <div className="grid h-full min-h-0 w-full min-w-0 grid-rows-4 items-center justify-center">
      <TrackLoop tracks={tracks}>
        <MyParticipantTile />
      </TrackLoop>
    </div>
  );
}

function MyParticipantTile() {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant.identity === localStorage.getItem('lkName');
  const isMuted = trackRef.publication?.track?.isMuted;

  return (
    <div className="relative">
      <ParticipantTile />
      {isUser && !isMuted && <FaceFilter />}
    </div>
  );
}

export default FacetimeContainer;
