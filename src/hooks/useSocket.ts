import { useCallback, useEffect } from 'react';
import SOCKET_EVENT from '../constants/SOCKET_EVENT';
import { useFacetimeChallengeStore } from '../store/facetimeChallengeStore';
import { facetimeChallengeStatus } from '../types/challenge';

const useSocket = () => {
  const { socket, setStatus, setRemainingTime } = useFacetimeChallengeStore();

  useEffect(() => {
    const handleChallengeStatus = (msg: {
      room: string;
      challengeStatus: facetimeChallengeStatus;
    }) => {
      console.log('challengeStatus', msg.challengeStatus);
      setStatus(msg.challengeStatus);
    };
    const handleChallengeStart = () => {
      console.log('challengeStart');
      setStatus('ongoing');
    };

    const handleChallengeEnd = () => {
      console.log('challengeEnd');
      setStatus('finished');
    };

    const handleRemainingTime = (msg: { remainingTime: number }) => {
      console.log('remainingTime', msg.remainingTime);
      setRemainingTime(msg.remainingTime);
    };

    socket.on(SOCKET_EVENT.CHALLENGE_STATUS, handleChallengeStatus);
    socket.on(SOCKET_EVENT.CHALLENGE_START, handleChallengeStart);
    socket.on(SOCKET_EVENT.CHALLENGE_END, handleChallengeEnd);
    socket.on(SOCKET_EVENT.TIME_UPDATE, handleRemainingTime);

    return () => {
      socket.off(SOCKET_EVENT.CHALLENGE_STATUS, handleChallengeStatus);
      socket.off(SOCKET_EVENT.CHALLENGE_START, handleChallengeStart);
      socket.off(SOCKET_EVENT.CHALLENGE_END, handleChallengeEnd);
      socket.off(SOCKET_EVENT.TIME_UPDATE, handleRemainingTime);
    };
  }, [setRemainingTime, setStatus, socket]);

  const emitJoin = useCallback(
    (code: string) => {
      socket.emit(SOCKET_EVENT.JOIN, { room: code });
    },
    [socket],
  );

  const emitChallengeStart = useCallback(
    (code: string) => {
      socket.emit(SOCKET_EVENT.CHALLENGE_START, { room: code });
    },
    [socket],
  );

  const emitLeave = useCallback(
    (code: string) => {
      socket.emit(SOCKET_EVENT.LEAVE, { room: code });
    },
    [socket],
  );

  const emitDisconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  return { emitJoin, emitChallengeStart, emitLeave, emitDisconnect };
};

export default useSocket;
