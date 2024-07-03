import { create } from 'zustand';

interface OpenModalParams {
  content: React.ReactNode;
  showCloseBtn: boolean;
}

export interface ModalState {
  isOpen: boolean;
  showCloseBtn: boolean;
  content: React.ReactNode;
}

export interface ModalAction {
  openModal: (props: OpenModalParams) => void;
  closeModal: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  showCloseBtn: true,
  content: null,
};

const useModalStore = create<ModalState & ModalAction>((set) => ({
  ...initialState,
  openModal: (props: OpenModalParams) =>
    set(() => ({ isOpen: true, ...props })),
  closeModal: () =>
    set(() => ({ isOpen: false, content: null, showCloseBtn: false })),
}));

export default useModalStore;
