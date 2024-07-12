import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { create } from 'zustand';

interface FaceLandmarkerStore {
  faceLandmarker: FaceLandmarker | null;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
  loadFaceLandmarker: () => Promise<void>;
}

export const useFaceLandmarker = create<FaceLandmarkerStore>((set) => ({
  faceLandmarker: null,
  isLoaded: false,
  setIsLoaded: (isLoaded: boolean) => set({ isLoaded }),
  loadFaceLandmarker: async () => {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm',
    );
    const modelAssetPath =
      'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
    const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numFaces: 1,
    });
    set({ faceLandmarker, isLoaded: true });
    console.log('FaceLandmarker loaded.', faceLandmarker);
  },
}));
