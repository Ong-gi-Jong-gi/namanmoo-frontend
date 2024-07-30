import { useTrackRefContext } from '@livekit/components-react';
import FACETIME from '../../../constants/FACETIME';
import MyParticipantTile from './MyParticipantTile';
import OtherParticipantTile from './OtherParticipantTile';

const CustomParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant?.identity ===
    localStorage.getItem(FACETIME.LOCAL_STORAGE_KEY);

  return (
    <div className="h-full w-full overflow-hidden">
      {isUser ? <MyParticipantTile /> : <OtherParticipantTile />}
    </div>
  );
};

export default CustomParticipantTile;
