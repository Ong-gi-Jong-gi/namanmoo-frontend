import { useEffect, useRef } from 'react';
import { useGetBackgroundVoice } from '../../apis/recap/getBackgroundVoice';
import { SYS_MESSAGE } from '../../constants/message';

const RecapEnding = ({ luckyId }: { luckyId: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isLoading, hasData, backgroundVoice } = useGetBackgroundVoice({
    luckyId,
  });

  useEffect(() => {
    if (backgroundVoice != null && !isLoading)
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play();
      }, 200);
  }, [backgroundVoice, isLoading]);

  if (!isLoading) <div>Loading</div>;
  if (!hasData) <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-col items-center justify-evenly break-keep rounded-2xl p-6 text-center font-ryurue text-ryurue-base">
      <div className="group-1 animation-delay-0 animate-fade-in opacity-0 drop-shadow-md">
        <p>늘 곁에 있어서 무심하게만 대했던,</p>
        <p>
          <span className="text-red">사랑해</span>,
          <span className="ml-2 text-red">고마워</span>라는 말로는
        </p>
        <p>마음을 다 표현할 수 없는</p>
        <p className="font-ryurue text-ryurue-lg text-secondary-20">"가족"</p>
      </div>
      <div className="group-2 animation-delay-100 animate-fade-in opacity-0 drop-shadow-md">
        <p>함께한 챌린지들이</p>
        <p>
          색다른
          <span className="text-red"> 추억 </span>
          이었길 바라며,
        </p>
        <p>
          그리고 앞으로는<span className="text-red"> 일상</span>이 되었으면
          좋겠습니다.
        </p>
      </div>
      <div className="group-3 animation-delay-200 animate-fade-in opacity-0 drop-shadow-md">
        <p>
          <span className="text-primary-30">행운이</span>가 드리는
        </p>
        <p className="mt-3">
          [ Day <span className="text-red">31</span> - 특별 챌린지 ]
        </p>
        <p>화면을 벗어나 직접 가족들과</p>
        <p> 추억을 쌓아보세요!</p>
      </div>

      <audio className="hidden" ref={audioRef} src={backgroundVoice} controls />
    </div>
  );
};

export default RecapEnding;
