import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { create } from 'zustand';

interface FaceLandmarkerStore {
  faceLandmarker: FaceLandmarksDetector | null;
  setFaceLandmarker: (faceLandmarker: FaceLandmarksDetector) => void;
}
const useFaceLandmarkerStore = create<FaceLandmarkerStore>((set) => ({
  faceLandmarker: null,
  setFaceLandmarker: (faceLandmarker: FaceLandmarksDetector) =>
    set(() => ({ faceLandmarker })),
}));

export default useFaceLandmarkerStore;
