interface FrameProps {
  videos: string[];
}

const Frame = ({ videos }: FrameProps) => {
  return (
    <div className="flex h-full w-full gap-2 bg-black px-4">
      <div className="relative grid w-full grid-rows-[1fr_1fr_0.25fr] gap-2 py-9">
        <div className="bg-paper bg-cover">
          {videos[0] && (
            <img
              src={videos[0]}
              alt=""
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="bg-paper bg-cover">
          {videos[1] && (
            <img
              src={videos[1]}
              alt=""
              className="h-full w-full object-contain"
            />
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
            <img
              src={videos[2]}
              alt=""
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="bg-paper bg-cover">
          {videos[3] && (
            <img
              src={videos[3]}
              alt=""
              className="h-full w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Frame;
