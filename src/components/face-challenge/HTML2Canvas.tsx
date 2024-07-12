import html2canvas from 'html2canvas';
import { PropsWithChildren, useRef } from 'react';
import Button from '../common/Button';

interface HTML2CanvasProps extends PropsWithChildren {}

const HTML2Canvas = ({ children }: HTML2CanvasProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const handleCapture = () => {
    if (screenRef.current) {
      html2canvas(screenRef.current).then((canvas) => {
        screenRef.current?.appendChild(canvas);
      });
    }
  };

  return (
    <div ref={screenRef} className="z-10 h-full w-full">
      {children}
      <Button label="찰칵" onClick={() => handleCapture()} />
    </div>
  );
};

export default HTML2Canvas;
