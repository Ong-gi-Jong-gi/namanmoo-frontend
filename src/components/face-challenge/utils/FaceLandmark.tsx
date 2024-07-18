import { PropsWithChildren, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useFaceLandmarker } from '../../../store/faceLandmarkerStore';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface FaceLandmarkProps extends PropsWithChildren {}

const FaceLandmark = ({ children }: FaceLandmarkProps) => {
  const { setSocket } = useFacetimeChallengeStore();
  const { loadFaceLandmarker } = useFaceLandmarker();
  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_NODE_API_URL);
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [setSocket]);
  useEffect(() => {
    loadFaceLandmarker();
  }, [loadFaceLandmarker]);

  return <>{children}</>;
};

export default FaceLandmark;
