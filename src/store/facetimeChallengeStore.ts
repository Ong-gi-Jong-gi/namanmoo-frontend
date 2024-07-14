import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { facetimeChallengeStatus } from '../types/challenge';

const socketInstance = io(import.meta.env.VITE_NODE_API_URL);

interface FacetimeChallengeStore {
  status: facetimeChallengeStatus;
  setStatus: (status: facetimeChallengeStatus) => void;
  remainingTime: number;
  setRemainingTime: (time: number) => void;
  socket: Socket;
}

export const useFacetimeChallengeStore = create<FacetimeChallengeStore>(
  (set) => ({
    status: 'idle',
    setStatus: (status) => set({ status }),
    remainingTime: 40,
    setRemainingTime: (time) => set({ remainingTime: time }),
    socket: socketInstance,
  }),
);
