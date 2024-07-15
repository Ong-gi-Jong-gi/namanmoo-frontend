import clsx from 'clsx';

type PolaroidSize = 'sub-sm' | 'sub-base' | 'main';

const sizeMap = {
  'sub-sm': 'w-20 h-24 px-2 pb-3 pt-2',
  'sub-base': 'w-40 h-48 px-3 pb-6 pt-3',
  main: 'w-72 h-80 px-4 pb-12 pt-4',
};

interface PolaroidFrameProps {
  size: PolaroidSize;
  imageUrl: string;
  x: number;
  y: number;
  rotation: number;
}

const PolaroidFrame = ({
  size,
  imageUrl,
  x,
  y,
  rotation,
}: PolaroidFrameProps) => {
  const polaroidClass = clsx('bg-polaroid absolute bg-cover', sizeMap[size]);

  return (
    <div
      className={polaroidClass}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <div className="bg-polaroid h-full w-full">
        <img
          src={imageUrl}
          alt="가족 사진"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default PolaroidFrame;
