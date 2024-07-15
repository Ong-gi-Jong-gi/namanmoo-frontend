import {
  ParticipantTile,
  useDataChannel,
  useIsMuted,
  useTrackRefContext,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import useFaceFilterWithModel from '../../../hooks/useFaceFilterWithModel';
import { useFilterTypeStore } from '../../../store/filterTypeStore';
import ScreenRecorder from '../utils/ScreenRecorder';

const encoder = new TextEncoder();

const MyParticipantTile = () => {
  const trackRef = useTrackRefContext();
  const { filterType } = useFilterTypeStore();

  const { send: sendKeypoints } = useDataChannel('filter');
  const isMuted = useIsMuted(trackRef);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null,
  );
  const { canvasRef, position, actualVideoSize } = useFaceFilterWithModel(
    videoElement,
    !isMuted || false,
  );

  useEffect(() => {
    if (position && actualVideoSize) {
      const myKeypoint = encoder.encode(
        JSON.stringify({ position, filterType, videoSize: actualVideoSize }),
      );
      sendKeypoints(myKeypoint, { topic: 'filter' });
    }
  }, [sendKeypoints, filterType, position, actualVideoSize]);

  useEffect(() => {
    if (trackRef.publication?.track?.attachedElements[0]) {
      setVideoElement(
        trackRef.publication?.track?.attachedElements[0] as HTMLVideoElement,
      );
    }
  }, [trackRef.publication?.track?.attachedElements]);

  return (
    <div className="relative -scale-x-100">
      <ScreenRecorder
        customMediaStream={trackRef.publication?.track?.mediaStream || null}
      />
      <ParticipantTile />
      <canvas className="absolute left-0 top-0" ref={canvasRef} />
    </div>
  );
};

export default MyParticipantTile;
