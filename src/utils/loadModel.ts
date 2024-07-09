import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-core';

export const loadFaceLandmarker = () => {
  return faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    {
      runtime: 'mediapipe',
      solutionPath: 'node_modules/@mediapipe/face_mesh',
      maxFaces: 1,
      refineLandmarks: false,
    },
  );
};
