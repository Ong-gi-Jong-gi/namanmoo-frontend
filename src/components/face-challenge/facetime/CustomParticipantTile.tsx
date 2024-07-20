import { useTrackRefContext } from '@livekit/components-react';
import FACETIME from '../../../constants/FACETIME';
import MyParticipantTile from './MyParticipantTile';
import OtherParticipantTile from './OtherParticipantTile';

const CustomParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant?.identity ===
    localStorage.getItem(FACETIME.LOCAL_STORAGE_KEY);

  return <>{isUser ? <MyParticipantTile /> : <OtherParticipantTile />}</>;
};

export default CustomParticipantTile;
