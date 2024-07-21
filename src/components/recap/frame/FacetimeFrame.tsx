import Lucky1 from '../../../assets/lucky/recap1.png';
import Lucky2 from '../../../assets/lucky/recap2.png';

interface FacetimeFrameProps {
  videos: string[];
  challengeDate: string;
}

const FacetimeFrame = ({ videos, challengeDate }: FacetimeFrameProps) => {
  return (
    <div className="flex h-full w-full gap-2 bg-black px-4">
      <div className="relative grid h-full w-full grid-rows-[1fr_1fr_0.25fr] gap-2 py-9">
        <VideoTile src={videos[0]} />
        <VideoTile src={videos[1]} />
        <div>
          <span className="font-pretendard text-pretendard-sm text-white">
            {challengeDate || '20XX.XX.XX'}
          </span>
          <img
            src={Lucky1}
            alt="리캡 행운이1"
            className="absolute bottom-0 right-0 w-24"
          />
        </div>
      </div>
      <div className="grid w-full grid-rows-[0.25fr_1fr_1fr] gap-2 py-9">
        <div className="relative">
          <img
            src={Lucky2}
            alt="리캡 행운이2"
            className="absolute -bottom-1 left-6 w-28"
          />
        </div>
        <VideoTile src={videos[2]} />
        <VideoTile src={videos[3]} />
      </div>
    </div>
  );
};

const VideoTile = ({ src }: { src: string }) => {
  return (
    <div className="bg-paper bg-cover">
      {src && (
        <video src={src} className="h-full w-full object-cover" autoPlay loop />
      )}
    </div>
  );
};

export default FacetimeFrame;
