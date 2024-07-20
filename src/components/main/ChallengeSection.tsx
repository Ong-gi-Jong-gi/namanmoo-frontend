import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MAX_FAMILY_MEMBER } from '../../constants/family';
import Loader from '../common/Loader';
import ChallengeButton from './ChallengeButton';
import Lucky from './Lucky';
import LuckySection from './LuckySection';
import TodayChallengeSection from './TodayChallengeSection';

interface ChallengeSectionProps {
  currentFamilySize: number;
}

const ChallengeSection = ({ currentFamilySize }: ChallengeSectionProps) => {
  const isFamilyFull = currentFamilySize === MAX_FAMILY_MEMBER;

  if (!isFamilyFull)
    return (
      <>
        <Lucky level={0} />
        <ChallengeButton
          type="disabled"
          text="챌린지 시작"
          currentSize={currentFamilySize}
          familySize={MAX_FAMILY_MEMBER}
        />
      </>
    );
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallback={<Lucky level={0} />}>
        <LuckySection />
      </ErrorBoundary>
      <ErrorBoundary
        fallback={<ChallengeButton type="active" text="챌린지 시작" />}
      >
        <TodayChallengeSection />
      </ErrorBoundary>
    </Suspense>
  );
};

export default ChallengeSection;
