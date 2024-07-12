import { useTrackRefContext } from '@livekit/components-react';
import MyParticipantTile from './MyParticipantTile';
import OtherParticipantTile from './OtherParticipantTile';
import ScreenRecorder from './ScreenRecorder';

const CustomParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant?.identity === localStorage.getItem('mooluck-nickname');

  return (
    <>
      {isUser ? <MyParticipantTile /> : <OtherParticipantTile />}
      <ScreenRecorder
        customMediaStream={trackRef.publication?.track?.mediaStream || null}
      />
    </>
  );
};

export default CustomParticipantTile;
