import { create } from 'zustand';
import { facetimeChallengeStatus } from '../types/challenge';

interface FacetimeChallengeStore {
  status: facetimeChallengeStatus;
  setStatus: (status: facetimeChallengeStatus) => void;
}

export const useFacetimeChallengeStore = create<FacetimeChallengeStore>(
  (set) => ({
    status: 'idle',
    setStatus: (status) => set({ status }),
  }),
);
