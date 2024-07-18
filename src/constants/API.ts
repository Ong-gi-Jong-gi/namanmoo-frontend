const AUTH = {
  SIGNUP: '/signup',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

const FAMILY = {
  MY: 'family/info',
  CREATE: '/family',
  JOIN: '/family/join',
  INFO: '/family',
};

const CHALLENGE = {
  STARTDATE: '/challenges/startDate',
  CREATE: '/challenges',
  TODAY: '/challenges/today',
  LIST: '/challenges/list',
  NORMAL: '/challenges/normal',
  PHOTO: '/challenges/photo',
  GROUP: '/challenges/group',
  FACE: '/challenges/face',
  VOICE: '/challenges/voice',
  FACE_RESULT: '/challenges/face/result',
};

const USER = '/users';

const RECAP = {
  LIST: '/recap/list',
  RANK: '/recap/ranking',
  STATISTICS: '/recap/statistics',
  APPRECIATIONS: '/recap/appreciations',
  FACE: 'recap/face',
  FAMILY_PHOTO: 'recap/photos',
  YOUTH: 'recap/youth',
};

const LUCKY = {
  STATUS: '/lucky',
  BUBBLE: '/lucky/bubble',
};

export default {
  AUTH,
  FAMILY,
  CHALLENGE,
  USER,
  RECAP,
  LUCKY,
};
