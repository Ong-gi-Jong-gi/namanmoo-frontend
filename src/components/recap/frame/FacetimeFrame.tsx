interface FacetimeFrameProps {
  videos: string[];
}

const FacetimeFrame = ({ videos }: FacetimeFrameProps) => {
  return (
    <div className="flex h-full w-full gap-2 bg-black px-4">
      <div className="relative grid h-full w-full grid-rows-[1fr_1fr_0.25fr] gap-2 py-9">
        <div className="bg-paper bg-cover">
          {videos[0] && (
            <video src={videos[0]} className="h-full w-full object-contain" />
          )}
        </div>
        <div className="bg-paper bg-cover">
          {videos[1] && (
            <video src={videos[1]} className="h-full w-full object-contain" />
          )}
        </div>
        <div>
          <span className="font-pretendard text-pretendard-sm text-white">
            2024.10.24
          </span>
          <img
            src="src/assets/lucky/recap1.png"
            alt="리캡 행운이1"
            className="absolute bottom-0 right-0 w-24"
          />
        </div>
      </div>
      <div className="grid w-full grid-rows-[0.25fr_1fr_1fr] gap-2 py-9">
        <div className="relative">
          <img
            src="src/assets/lucky/recap2.png"
            alt="리캡 행운이2"
            className="absolute -bottom-1 left-6 w-28"
          />
        </div>
        <div className="bg-paper bg-cover">
          {videos[2] && (
            <video src={videos[2]} className="h-full w-full object-contain" />
          )}
        </div>
        <div className="bg-paper bg-cover">
          {videos[3] && (
            <video src={videos[3]} className="h-full w-full object-contain" />
          )}
        </div>
      </div>
    </div>
  );
};

export default FacetimeFrame;
