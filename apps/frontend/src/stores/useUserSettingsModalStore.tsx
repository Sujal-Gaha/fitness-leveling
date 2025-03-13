import { create } from 'zustand';

type State = {
  isUserSettingsModalOpen: boolean;
};

type Action = {
  setUserSettingsModalOpen: (isUserSettingsModalOpen: boolean) => void;
  openUserSettingsModal: () => void;
  closeUserSettingsModal: () => void;
  toggleUserSettingsModal: () => void;
};

export const useUserSettingsModalStore = create<State & Action>((set) => ({
  isUserSettingsModalOpen: false,
  setUserSettingsModalOpen: (isUserSettingsModalOpen) => set(() => ({ isUserSettingsModalOpen })),
  openUserSettingsModal: () => set(() => ({ isUserSettingsModalOpen: true })),
  closeUserSettingsModal: () => set(() => ({ isUserSettingsModalOpen: false })),
  toggleUserSettingsModal: () => set((state) => ({ isUserSettingsModalOpen: !state.isUserSettingsModalOpen })),
}));
