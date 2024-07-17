import {
  ParticipantTile,
  useDataChannel,
  useIsMuted,
  useTrackRefContext,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import useFaceFilter from '../../../hooks/useFaceFilter';
import { FilterPosition, FilterType } from '../../../types/challenge';

const decoder = new TextDecoder();
const OtherParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const isMuted = useIsMuted(trackRef);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );
  const { message } = useDataChannel('filter');
  const [position, setPosition] = useState<FilterPosition | null>(null);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });
  const [filterType, setFilterType] = useState<FilterType>('none');

  const { canvasRef } = useFaceFilter(
    videoElement,
    !isMuted || false,
    filterType,
    position || null,
    videoSize,
  );

  useEffect(() => {
    if (trackRef.publication?.track?.attachedElements[0]) {
      setVideoElement(
        trackRef.publication?.track?.attachedElements[0] as HTMLVideoElement,
      );
    }
  }, [trackRef]);

  useEffect(() => {
    if (message) {
      const otherIdentity = message.from?.identity;
      if (!otherIdentity || otherIdentity !== trackRef.participant.identity)
        return;
      const data = JSON.parse(decoder.decode(message.payload));
      if (!data) return;
      setFilterType(data.filterType);
      setPosition(data.position);
      setVideoSize(data.videoSize);
    }
  }, [message, trackRef.participant.identity]);

  return (
    <div className="relative -scale-x-100">
      <ParticipantTile />
      <canvas className="absolute left-0 top-0" ref={canvasRef} />
    </div>
  );
};

export default OtherParticipantTile;
