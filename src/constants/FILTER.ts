import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { FilterTypeWithoutNone } from '../types/challenge';
import {
  calcDogPosition,
  calcRainbowPosition,
  calcSunglassesPosition,
} from '../utils/calculateFilterPosition';

const IMAGE: {
  [key in FilterTypeWithoutNone]: string;
} = {
  sunglasses: '/src/assets/filter/sunglasses.png',
  rainbow: '/src/assets/filter/rainbow.png',
  dog: '/src/assets/filter/doggy.png',
} as const;

const CALCULATOR: {
  [key in FilterTypeWithoutNone]: (
    keypoints: NormalizedLandmark[],
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
} = {
  sunglasses: calcSunglassesPosition,
  rainbow: calcRainbowPosition,
  dog: calcDogPosition,
} as const;

Object.freeze(IMAGE);
Object.freeze(CALCULATOR);

export default { IMAGE, CALCULATOR };
