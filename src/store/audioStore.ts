import { create } from 'zustand';

interface AudioState {
  audioRef: HTMLAudioElement | null;
}

interface AudioAction {
  setAudioRef: (ref: HTMLAudioElement) => void;
  playAudio: (ref: HTMLAudioElement) => void;
}

const useAudioStore = create<AudioState & AudioAction>((set) => ({
  audioRef: null,
  setAudioRef: (ref) => set({ audioRef: ref }),
  playAudio: (ref) => {
    set((state) => {
      if (state.audioRef && state.audioRef !== ref) {
        state.audioRef.pause();
      }
      return { audioRef: ref };
    });
  },
}));

export default useAudioStore;
