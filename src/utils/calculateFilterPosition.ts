import { NormalizedLandmark } from '@mediapipe/tasks-vision';

const facePoint = {
  leftEyeTop: 124,
  rightEyeTop: 276,
  leftEyeBottom: 111,
};

export const calcSunglassesPosition = (
  keypoints: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number,
) => {
  // 필터 위치 조정을 위한 패딩
  const padding = {
    x: 30,
    y: 10,
  };

  if (
    !keypoints ||
    keypoints.length <=
      Math.max(
        facePoint.leftEyeTop,
        facePoint.rightEyeTop,
        facePoint.leftEyeBottom,
      )
  ) {
    return null;
  }

  // 좌표를 실제 캔버스 크기로 변환
  const leftEyeTopX = keypoints[facePoint.leftEyeTop].x * canvasWidth;
  const leftEyeTopY = keypoints[facePoint.leftEyeTop].y * canvasHeight;
  const rightEyeTopX = keypoints[facePoint.rightEyeTop].x * canvasWidth;
  const rightEyeTopY = keypoints[facePoint.rightEyeTop].y * canvasHeight;
  const leftEyeBottomY = keypoints[facePoint.leftEyeBottom].y * canvasHeight;

  // 필터의 x 위치: 왼쪽 눈 상단 지점의 x 좌표에서 가로 여백을 뺀 값
  const x = leftEyeTopX - padding.x;
  // 필터의 y 위치: 왼쪽 눈 상단 지점의 y 좌표에서 세로 여백을 뺀 값
  const y = leftEyeTopY - padding.y;

  // 필터의 너비: 오른쪽 눈 상단 지점의 x 좌표에서 왼쪽 눈 상단 지점의 x 좌표를 뺀 후, 양쪽에 가로 여백을 더한 값
  const width = rightEyeTopX - leftEyeTopX + padding.x * 2;

  // 필터의 높이: 왼쪽 눈 하단 지점의 y 좌표에서 왼쪽 눈 상단 지점의 y 좌표를 뺀 후, 양쪽에 세로 여백을 더한 값
  const height = leftEyeBottomY - leftEyeTopY + padding.y * 2;

  // 각도 계산 (radians에서 degrees로 변환)
  const deltaX = rightEyeTopX - leftEyeTopX;
  const deltaY = rightEyeTopY - leftEyeTopY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert from radians to degrees

  // 필터의 위치와 크기를 반환
  return {
    x,
    y,
    width,
    height,
    angle,
  };
};
