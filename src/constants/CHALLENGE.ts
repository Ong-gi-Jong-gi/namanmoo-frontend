export type ChallengeType = ['NORMAL', 'GROUP', 'FACETIME', 'PHOTO', 'VOICE'];

export const CHALLENGE_COLOR: {
  [key: string]: string;
} = {
  NORMAL: '#f7c18980',
  GROUP: '#f9dc8580',
  FACETIME: '#accd9d80',
  PHOTO: '#93b9dc80',
  VOICE: '#b295d280',
} as const;
