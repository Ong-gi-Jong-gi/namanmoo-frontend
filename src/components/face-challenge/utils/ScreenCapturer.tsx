import html2canvas from 'html2canvas';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../../apis/challenge/postFaceChallenge';
import FACETIME from '../../../constants/FACETIME';
import { useFacetimeChallengeStore } from '../../../store/facetimeChallengeStore';

interface ScreenCapturerProps extends PropsWithChildren {}

const ScreenCapturer = ({ children }: ScreenCapturerProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { challengeId } = useParams();
  const { mutate } = usePostFaceChallenge();
  const countRef = useRef(1);

  const handleTestCapture = () => {
    if (screenRef.current) {
      html2canvas(screenRef.current, { scale: 4 }).then((canvas) => {
        // canvas 화면에 띄우기
        screenRef.current && screenRef.current.appendChild(canvas);
      });
    }
  };

  useEffect(() => {
    const handleCapture = () => {
      if (screenRef.current) {
        html2canvas(screenRef.current, { scale: 4 }).then((canvas) => {
          canvas.toBlob((blob) => {
            if (!blob) return;
            const imgFile = new File(
              [blob],
              `screenshot_${countRef.current}.png`,
              {
                type: blob.type,
              },
            );
            countRef.current += 1;
            if (!challengeId || !imgFile) return;
            const formData = new FormData();
            formData.append('challengeId', challengeId);
            formData.append('answer', imgFile);
            mutate(formData);
          });
        });
      }
    };

    if (
      status === 'ongoing' &&
      remainingTime % FACETIME.TIMER_UNIT === 0 &&
      remainingTime < FACETIME.TIMER_UNIT * FACETIME.PHOTO_COUNT
    ) {
      handleCapture();
    }
  }, [status, remainingTime, challengeId, mutate]);

  return (
    <>
      <div className="hi h-full w-full" ref={screenRef}>
        {children}
      </div>
      <button onClick={handleTestCapture}>찰칵</button>
    </>
  );
};

export default ScreenCapturer;
