import { ParticipantTile, useTrackRefContext } from '@livekit/components-react';
import { useEffect, useState } from 'react';
import useFaceFilter from '../../hooks/useFaceFilter';

const CustomParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const isUser =
    trackRef.participant?.identity === localStorage.getItem('mooluck-nickname');
  const isMuted = trackRef.publication?.track?.isMuted;
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );
  const { canvasRef } = useFaceFilter(
    videoElement,
    (!isMuted && isUser) || false,
  );

  useEffect(() => {
    if (trackRef.publication?.track?.attachedElements[0]) {
      setVideoElement(
        trackRef.publication?.track?.attachedElements[0] as HTMLVideoElement,
      );
    }
  }, [trackRef.publication?.track?.attachedElements]);

  return (
    <div className="relative">
      <ParticipantTile />
      <canvas className="absolute left-0 top-0 -scale-x-100" ref={canvasRef} />
    </div>
  );
};

export default CustomParticipantTile;
