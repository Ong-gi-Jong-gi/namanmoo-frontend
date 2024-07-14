import html2canvas from 'html2canvas';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { usePostFaceChallenge } from '../../apis/challenge/postFaceChallenge';
import { useFacetimeChallengeStore } from '../../store/facetimeChallengeStore';

interface HTML2CanvasProps extends PropsWithChildren {}

const HTML2Canvas = ({ children }: HTML2CanvasProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const { status, remainingTime } = useFacetimeChallengeStore();
  const { challengeId } = useParams();
  const { mutate } = usePostFaceChallenge();

  useEffect(() => {
    const handleCapture = () => {
      if (screenRef.current) {
        html2canvas(screenRef.current, { scale: 4 }).then((canvas) => {
          window.open(
            canvas
              .toDataURL('image/png')
              .replace('image/png', 'image/octet-stream'),
          );
          canvas.toBlob((blob) => {
            if (!blob) return;
            const imgFile = new File([blob], 'screenshot.png', {
              type: blob.type,
            });
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
      remainingTime % 10 === 0 &&
      remainingTime < 40
    ) {
      handleCapture();
    }
  }, [status, remainingTime, challengeId, mutate]);

  return (
    <div className="h-full w-full" ref={screenRef}>
      {children}
    </div>
  );
};

export default HTML2Canvas;
