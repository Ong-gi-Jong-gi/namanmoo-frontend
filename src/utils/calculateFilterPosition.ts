import { NormalizedLandmark } from '@mediapipe/tasks-vision';

const facePoint = {
  leftEyeTop: 124,
  rightEyeTop: 276,
  leftEyeBottom: 111,
  mouthTop: 164,
  mouthBottom: 200,
  mouthLeft: 216,
  mouthRight: 436,
  faceLeft: 234,
  faceRight: 454,
  faceTop: 151,
  noseTop: 8,
  noseBottom: 4,
};

export const calcSunglassesPosition = (
  keypoints: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number,
) => {
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
  const noseCenterX = keypoints[facePoint.noseTop].x * canvasWidth;
  const leftEyeTopY = keypoints[facePoint.leftEyeTop].y * canvasHeight;
  const faceLeftX = keypoints[facePoint.faceLeft].x * canvasWidth;
  const faceRightX = keypoints[facePoint.faceRight].x * canvasWidth;

  // 필터의 너비: 오른쪽 눈 상단 지점의 x 좌표에서 왼쪽 눈 상단 지점의 x 좌표를 뺀 후, 양쪽에 가로 여백을 더한 값
  const width = (faceRightX - faceLeftX) * 0.9;

  // 필터의 높이: 왼쪽 눈 하단 지점의 y 좌표에서 왼쪽 눈 상단 지점의 y 좌표를 뺀 후, 양쪽에 세로 여백을 더한 값
  const height = width * 0.22;

  // 필터의 x 위치: 왼쪽 눈 상단 지점의 x 좌표에서 가로 여백을 뺀 값
  const x = noseCenterX - width * 0.5;
  // 필터의 y 위치: 왼쪽 눈 상단 지점의 y 좌표에서 세로 여백을 뺀 값
  const y = leftEyeTopY + height * 0.25;

  // 필터의 위치와 크기를 반환
  return {
    x,
    y,
    width,
    height,
  };
};

export const calcRainbowPosition = (
  keypoints: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number,
) => {
  if (
    !keypoints ||
    keypoints.length <=
      Math.max(
        facePoint.mouthTop,
        facePoint.mouthBottom,
        facePoint.mouthLeft,
        facePoint.mouthRight,
      )
  ) {
    return null;
  }

  // 좌표를 실제 캔버스 크기로 변환
  const mouthTopY = keypoints[facePoint.mouthTop].y * canvasHeight;
  const mouthLeftX = keypoints[facePoint.mouthLeft].x * canvasWidth;
  const mouthRightX = keypoints[facePoint.mouthRight].x * canvasWidth;

  // 필터의 너비: 입술 우측 지점의 x 좌표에서 입술 좌측 지점의 x 좌표를 뺀 후, 양쪽에 가로 여백을 더한 값
  const width = (mouthRightX - mouthLeftX) * 1.1;
  // 필터의 높이: 입술 하단 지점의 y 좌표에서 입술 상단 지점의 y 좌표를 뺀 후, 양쪽에 세로 여백을 더한 값
  const height = width * 4;
  // 필터의 x 위치: 입술 상단 지점의 x 좌표에서 가로 여백을 뺀 값
  const x = mouthLeftX - (mouthRightX - mouthLeftX) * 0.05;
  // 필터의 y 위치: 입술 상단 지점의 y 좌표에서 세로 여백을 뺀 값
  const y = mouthTopY;

  // 필터의 위치와 크기를 반환
  return {
    x,
    y,
    width,
    height,
  };
};

export const calcDogPosition = (
  keypoints: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number,
) => {
  if (
    !keypoints ||
    keypoints.length <=
      Math.max(facePoint.faceLeft, facePoint.faceRight, facePoint.faceTop)
  ) {
    return null;
  }

  // 좌표를 실제 캔버스 크기로 변환
  const noseCenterX = keypoints[facePoint.noseBottom].x * canvasWidth;
  const faceLeftX = keypoints[facePoint.faceLeft].x * canvasWidth;
  const faceRightX = keypoints[facePoint.faceRight].x * canvasWidth;
  const faceTopY = keypoints[facePoint.faceTop].y * canvasHeight;

  // 필터의 너비
  const width = (faceRightX - faceLeftX) * 1.4;
  // 필터의 높이
  const height = width * 0.87;
  // 필터의 x 위치
  const x = noseCenterX - width * 0.5;
  // 필터의 y 위치
  const y = faceTopY - width * 0.35;

  return {
    x,
    y,
    width,
    height,
  };
};
