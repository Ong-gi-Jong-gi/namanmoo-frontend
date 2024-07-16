import { create } from 'zustand';

interface UpBottomSheetProps {
  content: React.ReactNode;
}

export interface BottomSheetState {
  isOpen: boolean;
  content: React.ReactNode;
}

export interface BottomSheetAction {
  upBottomSheet: (props: UpBottomSheetProps) => void;
  downBottomSheet: () => void;
}

const initialState: BottomSheetState = {
  isOpen: false,
  content: null,
};

const useBottomSheetStore = create<BottomSheetState & BottomSheetAction>(
  (set) => ({
    ...initialState,
    upBottomSheet: (props: UpBottomSheetProps) =>
      set(() => ({ ...props, isOpen: true })),
    downBottomSheet: () => set((state) => ({ ...state, isOpen: false })),
  }),
);

export default useBottomSheetStore;
