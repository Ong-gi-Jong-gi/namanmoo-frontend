import { useCallback, useEffect } from 'react';
import SOCKET from '../constants/SOCKET';
import { useFacetimeChallengeStore } from '../store/facetimeChallengeStore';
import { facetimeChallengeStatus } from '../types/challenge';

const useSocket = () => {
  const { socket, setStatus, setRemainingTime } = useFacetimeChallengeStore();

  useEffect(() => {
    const handleChallengeStatus = (msg: {
      room: string;
      challengeStatus: facetimeChallengeStatus;
    }) => {
      setStatus(msg.challengeStatus);
    };
    const handleChallengeStart = () => {
      setStatus('ongoing');
    };

    const handleChallengeEnd = () => {
      setStatus('finished');
    };

    const handleRemainingTime = (msg: { remainingTime: number }) => {
      setRemainingTime(msg.remainingTime);
    };

    socket.on(SOCKET.EVENT.CHALLENGE_STATUS, handleChallengeStatus);
    socket.on(SOCKET.EVENT.CHALLENGE_START, handleChallengeStart);
    socket.on(SOCKET.EVENT.CHALLENGE_END, handleChallengeEnd);
    socket.on(SOCKET.EVENT.TIME_UPDATE, handleRemainingTime);

    return () => {
      socket.off(SOCKET.EVENT.CHALLENGE_STATUS, handleChallengeStatus);
      socket.off(SOCKET.EVENT.CHALLENGE_START, handleChallengeStart);
      socket.off(SOCKET.EVENT.CHALLENGE_END, handleChallengeEnd);
      socket.off(SOCKET.EVENT.TIME_UPDATE, handleRemainingTime);
    };
  }, [setRemainingTime, setStatus, socket]);

  const emitJoin = useCallback(
    (code: string) => {
      socket.emit(SOCKET.EVENT.JOIN, { room: code });
    },
    [socket],
  );

  const emitChallengeStart = useCallback(
    (code: string) => {
      socket.emit(SOCKET.EVENT.CHALLENGE_START, { room: code });
    },
    [socket],
  );

  const emitLeave = useCallback(
    (code: string) => {
      socket.emit(SOCKET.EVENT.LEAVE, { room: code });
    },
    [socket],
  );

  const emitDisconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  return { emitJoin, emitChallengeStart, emitLeave, emitDisconnect };
};

export default useSocket;
