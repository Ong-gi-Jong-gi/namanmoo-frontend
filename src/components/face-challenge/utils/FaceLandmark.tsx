import { PropsWithChildren, useEffect } from 'react';
import { io } from 'socket.io-client';
import FACETIME from '../../../constants/FACETIME';
import useSocket from '../../../hooks/useSocket';
import { useFaceLandmarker } from '../../../store/faceLandmarkerStore';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface FaceLandmarkProps extends PropsWithChildren {
  code: string;
}

const FaceLandmark = ({ children, code }: FaceLandmarkProps) => {
  const { emitLeave, emitDisconnect } = useSocket();
  const { setSocket, setRemainingTime } = useFacetimeChallengeStore();

  useEffect(() => {
    setRemainingTime(FACETIME.TIMER_UNIT * FACETIME.PHOTO_COUNT);
  }, [setRemainingTime]);

  const { loadFaceLandmarker } = useFaceLandmarker();
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_NODE_API_URL);
    setSocket(socketInstance);
    return () => {
      emitLeave(code);
      emitDisconnect();
      socketInstance.disconnect();
    };
  }, [setSocket, code]);
  useEffect(() => {
    loadFaceLandmarker();
  }, [loadFaceLandmarker]);

  return <>{children}</>;
};

export default FaceLandmark;
