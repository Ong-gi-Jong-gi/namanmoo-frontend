type ChallengeType = 'NormalC' | 'GroupC' | 'FaceTimeC' | 'PhotoC' | 'VoiceC';

export interface ChallengeInfo {
  challengeId: string;
  challengeNumber: string;
  challengeTitle: string;
  challengeType: ChallengeType;
}
