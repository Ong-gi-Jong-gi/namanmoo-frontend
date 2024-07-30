import { useRef } from 'react';
import { useGetBackgroundVoice } from '../../apis/recap/getBackgroundVoice';
import { SYS_MESSAGE } from '../../constants/message';

const RecapEnding = ({ luckyId }: { luckyId: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isLoading, hasData, backgroundVoice } = useGetBackgroundVoice({
    luckyId,
  });

  if (isLoading) return <div>Loading</div>;
  if (!hasData) return <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-col items-center justify-evenly break-keep rounded-2xl p-6 text-center font-ryurue text-ryurue-base">
      <div className="flex flex-col">
        <p className="lyric-1 h-20 animate-scale-up-with-shake opacity-0">
          우리
        </p>
        <p className="lyric-2 h-20 animate-scale-up-with-shake opacity-0">
          행복하자
        </p>
        <p className="lyric-3 h-20 animate-scale-up-with-shake opacity-0">
          많이
        </p>
        <p className="lyric-4 h-20 animate-scale-up-with-shake text-red opacity-0">
          사랑해
        </p>
      </div>
      <div className="group-3 animation-delay-500 animate-fade-in text-ryurue-md opacity-0 drop-shadow-md">
        {/* <p>
          <span className="text-[#6aac4b]">행운이</span>가 드리는
        </p> */}
        <p className="mt-3">
          [ Day <span className="text-red">31</span> - 특별 챌린지 ]
        </p>
        <p>
          <span className="mr-2 font-ryurue text-ryurue-lg text-secondary-20">
            가족
          </span>
          들에게 직접
        </p>
        <p>
          <span className="mr-2 text-red">"사랑해❤️"</span>라고 해보세요!
        </p>
      </div>
      <audio
        className="hidden"
        ref={audioRef}
        src={backgroundVoice}
        controls
        autoPlay
      />
    </div>
  );
};

export default RecapEnding;
