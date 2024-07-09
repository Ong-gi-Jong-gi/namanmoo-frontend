import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { create } from 'zustand';

interface FaceLandmarkerStore {
  faceLandmarker: FaceLandmarksDetector | null;
  setFaceLandmarker: (faceLandmarker: FaceLandmarksDetector) => void;
  status: 'Initializing...' | 'Load Model...' | 'Model Loaded';
  setStatus: (
    status: 'Initializing...' | 'Load Model...' | 'Model Loaded',
  ) => void;
}
const useFaceLandmarkerStore = create<FaceLandmarkerStore>((set) => ({
  faceLandmarker: null,
  setFaceLandmarker: (faceLandmarker: FaceLandmarksDetector) =>
    set(() => ({ faceLandmarker })),
  status: 'Initializing...',
  setStatus: (status: 'Initializing...' | 'Load Model...' | 'Model Loaded') =>
    set(() => ({ status })),
}));

export default useFaceLandmarkerStore;
