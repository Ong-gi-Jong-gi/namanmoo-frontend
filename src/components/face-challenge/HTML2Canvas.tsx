import html2canvas from 'html2canvas';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useFacetimeChallengeStore } from '../../store/facetimeChallengeStore';

interface HTML2CanvasProps extends PropsWithChildren {}

const HTML2Canvas = ({ children }: HTML2CanvasProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const { status, remainingTime } = useFacetimeChallengeStore();

  const handleCapture = () => {
    if (screenRef.current) {
      html2canvas(screenRef.current).then((canvas) => {
        // canvas 이미지를 새 창으로 열어서 확인할 수 있도록 함
        window.open(canvas.toDataURL('image/png'));
      });
    }
  };

  useEffect(() => {
    if (status === 'ongoing' && remainingTime % 10 === 0) {
      handleCapture();
    }
  }, [status, remainingTime]);

  return (
    <div ref={screenRef} className="z-10 h-full w-full">
      {children}
    </div>
  );
};

export default HTML2Canvas;
