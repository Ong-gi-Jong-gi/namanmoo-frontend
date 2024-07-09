import { type Keypoint } from '@tensorflow-models/face-landmarks-detection';

const facePoint = {
  leftEyeTop: 124,
  rightEyeTop: 276,
  leftEyeBottom: 111,
};

export const calculateSunglassesPosition = (keypoints: Keypoint[]) => {
  const xPadding = 24;
  const yPadding = 8;

  const x = keypoints[facePoint.leftEyeTop].x - xPadding;
  const y = keypoints[facePoint.leftEyeTop].y - yPadding;
  const width =
    keypoints[facePoint.rightEyeTop].x -
    keypoints[facePoint.leftEyeTop].x +
    xPadding * 2;
  const height =
    keypoints[facePoint.leftEyeBottom].y -
    keypoints[facePoint.leftEyeTop].y +
    yPadding * 2;

  const deltaX =
    keypoints[facePoint.rightEyeTop].x - keypoints[facePoint.leftEyeTop].x;
  const deltaY =
    keypoints[facePoint.rightEyeTop].y - keypoints[facePoint.leftEyeTop].y;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert from radians to degrees

  return {
    x,
    y,
    width,
    height,
    angle,
  };
};
