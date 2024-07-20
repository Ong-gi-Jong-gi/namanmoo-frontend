import { Socket } from 'socket.io-client';
import { create } from 'zustand';
import FACETIME from '../constants/FACETIME';
import { facetimeChallengeStatus } from '../types/challenge';

interface FacetimeChallengeStore {
  status: facetimeChallengeStatus;
  setStatus: (status: facetimeChallengeStatus) => void;
  remainingTime: number;
  setRemainingTime: (time: number) => void;
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

export const useFacetimeChallengeStore = create<FacetimeChallengeStore>(
  (set) => ({
    status: 'idle',
    setStatus: (status) => set({ status }),
    remainingTime: FACETIME.TIMER_UNIT * FACETIME.PHOTO_COUNT,
    setRemainingTime: (time) => set({ remainingTime: time }),
    socket: null,
    setSocket: (socket: Socket) => set({ socket }),
  }),
);
