interface ImagePosition {
  x: number;
  y: number;
  rotation: number;
  type: 'sub-base' | 'sub-sm' | 'young';
  theme?: 'paper' | 'polaroid' | 'black';
}

const IMAGE_POSITION: ImagePosition[] = [
  {
    x: 20,
    y: 18,
    rotation: 23,
    type: 'sub-base',
  },
  {
    x: 50,
    y: 80,
    rotation: -33,
    type: 'sub-sm',
  },
  {
    x: 80,
    y: 8,
    rotation: -47,
    type: 'sub-sm',
  },
  {
    x: 10,
    y: 70,
    rotation: -11,
    type: 'sub-base',
  },
  {
    x: 67,
    y: 93,
    rotation: 34,
    type: 'sub-base',
  },
  {
    x: 95,
    y: 70,
    rotation: -30,
    type: 'sub-base',
  },
  {
    x: 55,
    y: 20,
    rotation: 18,
    type: 'sub-sm',
  },
  {
    x: 95,
    y: 32,
    rotation: -10,
    type: 'sub-base',
  },
  {
    x: 20,
    y: 93,
    rotation: -10,
    type: 'sub-sm',
  },
] as const;

const YOUNG_IMAGE_POSITION: ImagePosition[] = [
  {
    x: 67,
    y: 85,
    rotation: 30,
    type: 'young',
    theme: 'paper',
  },
  {
    x: 35,
    y: 20,
    rotation: -10,
    type: 'young',
  },

  {
    x: 28,
    y: 68,
    rotation: -10,
    type: 'young',
  },
  {
    x: 74,
    y: 46,
    rotation: 38,
    type: 'young',
    theme: 'paper',
  },
] as const;

export default { IMAGE_POSITION, YOUNG_IMAGE_POSITION };
