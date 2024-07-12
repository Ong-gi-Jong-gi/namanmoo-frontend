import { PropsWithChildren, useEffect } from 'react';
import { useFaceLandmarker } from '../../store/faceLandmarkerStore';

interface FaceLandmarkProps extends PropsWithChildren {}

const FaceLandmark = ({ children }: FaceLandmarkProps) => {
  const { loadFaceLandmarker } = useFaceLandmarker();
  useEffect(() => {
    loadFaceLandmarker();
  }, [loadFaceLandmarker]);

  return <>{children}</>;
};

export default FaceLandmark;
