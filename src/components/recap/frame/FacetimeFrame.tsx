import Lucky1 from '../../../assets/lucky/recap1.png';
import Lucky2 from '../../../assets/lucky/recap2.png';
import FACETIME from '../../../constants/FACETIME';

interface FacetimeFrameProps {
  videos: string[];
  challengeDate: string;
}

const FacetimeFrame = ({ videos, challengeDate }: FacetimeFrameProps) => {
  return (
    <div className="grid h-full grid-cols-2 gap-2 bg-black px-4">
      <div className="relative grid h-full grid-rows-[35vh_35vh_1fr] gap-2 py-9">
        <VideoTile src={videos[0]} />
        <VideoTile src={videos[1]} />
        <div>
          <span className="font-pretendard text-pretendard-sm text-white">
            {challengeDate || '20XX.XX.XX'}
          </span>
          <img
            src={Lucky1}
            alt="리캡 행운이1"
            className="absolute bottom-0 right-0 w-1/2"
          />
        </div>
      </div>
      <div className="grid h-full grid-rows-[1fr_35vh_35vh] gap-2 py-9">
        <div className="relative">
          <img
            src={Lucky2}
            alt="리캡 행운이2"
            className="absolute -bottom-1 left-6 w-1/2"
          />
        </div>
        <VideoTile src={videos[2]} />
        <VideoTile src={videos[3]} />
      </div>
    </div>
  );
};

const VideoTile = ({ src }: { src: string }) => {
  const videoSrc = `${src}#t,${FACETIME.PHOTO_COUNT * FACETIME.TIMER_UNIT}`;
  return (
    <div className="bg-paper bg-cover">
      {src && (
        <video
          src={videoSrc}
          className="h-full w-full object-cover"
          autoPlay
          loop
        />
      )}
    </div>
  );
};

export default FacetimeFrame;
