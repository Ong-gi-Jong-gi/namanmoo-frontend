import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import Dog from '../assets/filter/doggy.png';
import Rainbow from '../assets/filter/rainbow.png';
import Sunglasses from '../assets/filter/sunglasses.png';
import { FilterTypeWithoutNone } from '../types/challenge';
import {
  calcDogPosition,
  calcRainbowPosition,
  calcSunglassesPosition,
} from '../utils/calculateFilterPosition';

const IMAGE: {
  [key in FilterTypeWithoutNone]: string;
} = {
  sunglasses: Sunglasses,
  rainbow: Rainbow,
  dog: Dog,
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
