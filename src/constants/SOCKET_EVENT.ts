const SOCKET_EVENT = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  JOIN: 'join',
  LEAVE: 'leave',
  CHALLENGE_START: 'challengeStart',
  CHALLENGE_END: 'challengeEnd',
  TIME_UPDATE: 'timeUpdate',
  CHALLENGE_STATUS: 'challengeStatus',
} as const;

Object.freeze(SOCKET_EVENT);

export default SOCKET_EVENT;
