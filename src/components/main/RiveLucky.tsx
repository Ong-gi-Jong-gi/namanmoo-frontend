import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from '@rive-app/react-canvas';
import { useEffect } from 'react';

const riveMap = {
  0: 'src/assets/rive/soil.riv',
  1: 'src/assets/rive/potato.riv',
  2: 'src/assets/rive/ongsim.riv',
  3: 'src/assets/rive/lucky.riv',
};

interface RiveLuckyProps {
  level: 0 | 1 | 2 | 3;
  isBubble?: boolean;
}

const RiveLucky = ({ level, isBubble }: RiveLuckyProps) => {
  const STATE_MACHINE_NAME = 'happy';
  const INPUT_NAME = 'isBubble';

  const { rive, RiveComponent } = useRive({
    src: riveMap[level],
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.BottomCenter,
    }),
  });

  const onClickInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME,
    false,
  );

  useEffect(() => {
    if (isBubble) {
      onClickInput && (onClickInput.value = true);
      return;
    }
    onClickInput && (onClickInput.value = false);
  }, [isBubble, onClickInput]);

  return (
    <div className="mx-auto h-full w-full">
      <RiveComponent className="h-56" />
    </div>
  );
};

export default RiveLucky;
