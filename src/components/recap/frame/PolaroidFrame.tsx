import clsx from 'clsx';

type PolaroidType = 'sub-sm' | 'sub-base' | 'young' | 'main';
type PolaroidTheme = 'paper' | 'polaroid' | 'black';

const themeMap = {
  polaroid: 'bg-polaroid',
  paper: 'bg-paper',
  black: 'bg-black text-white',
};

const typeMap = {
  'sub-sm': 'w-20 h-24 px-2 pb-3 pt-2',
  'sub-base': 'w-40 h-48 px-3 pb-6 pt-3',
  young: 'w-56 h-72 px-4 pt-4 pb-12',
  main: 'w-72 h-80 px-4 pb-12 pt-4',
};

interface PolaroidFrameProps {
  type: PolaroidType;
  imageUrl: string;
  x: number;
  y: number;
  rotation: number;
  text?: string;
  theme?: PolaroidTheme;
}

const PolaroidFrame = ({
  type,
  imageUrl,
  x,
  y,
  rotation,
  text,
  theme = 'polaroid',
}: PolaroidFrameProps) => {
  const polaroidClass = clsx(
    'absolute bg-cover',
    typeMap[type],
    themeMap[theme],
  );

  return (
    <div
      className={polaroidClass}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      <div className="bg-polaroid h-full w-full overflow-hidden">
        <img
          src={imageUrl}
          alt="가족 사진"
          className="h-full w-full object-cover"
        />
      </div>
      {type === 'young' && text && (
        <p className="p-2 text-center font-ryurue text-ryurue-base">{text}</p>
      )}
    </div>
  );
};

export default PolaroidFrame;
