// Web Worker을 이용해 얼굴 인식 로직 분리
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

let faceLandmarker: FaceLandmarker | null = null;

onmessage = async (event) => {
  const { action, videoFrame } = event.data;

  if (action === 'init' && !faceLandmarker) {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm',
    );
    const modelAssetPath =
      'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numFaces: 1,
    });
    postMessage({ status: 'initialized' });
    return;
  }

  if (action === 'detect' && faceLandmarker) {
    const startTimeMs = performance.now();
    const { faceLandmarks } = faceLandmarker.detectForVideo(
      videoFrame,
      startTimeMs,
    );
    postMessage({ faceLandmarks });
    return;
  }
};
