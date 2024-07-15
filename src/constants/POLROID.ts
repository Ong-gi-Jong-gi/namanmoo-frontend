interface ImagePosition {
  x: number;
  y: number;
  rotation: number;
  size: 'sub-base' | 'sub-sm';
}

const IMAGE_POSITION: ImagePosition[] = [
  {
    x: 20,
    y: 18,
    rotation: 23,
    size: 'sub-base',
  },
  {
    x: 50,
    y: 80,
    rotation: -33,
    size: 'sub-sm',
  },
  {
    x: 80,
    y: 8,
    rotation: -47,
    size: 'sub-sm',
  },
  {
    x: 10,
    y: 70,
    rotation: -11,
    size: 'sub-base',
  },
  {
    x: 67,
    y: 93,
    rotation: 34,
    size: 'sub-base',
  },
  {
    x: 95,
    y: 70,
    rotation: -30,
    size: 'sub-base',
  },
  {
    x: 55,
    y: 20,
    rotation: 18,
    size: 'sub-sm',
  },
  {
    x: 95,
    y: 32,
    rotation: -10,
    size: 'sub-base',
  },
  {
    x: 20,
    y: 93,
    rotation: -10,
    size: 'sub-sm',
  },
] as const;

export default { IMAGE_POSITION };
