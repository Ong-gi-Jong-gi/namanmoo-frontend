import { useTrackRefContext } from '@livekit/components-react';
import MyParticipantTile from './MyParticipantTile';
import OtherParticipantTile from './OtherParticipantTile';

const CustomParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant?.identity === localStorage.getItem('mooluck-nickname');

  return <>{isUser ? <MyParticipantTile /> : <OtherParticipantTile />}</>;
};

export default CustomParticipantTile;
