import { type ReactNode } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { UserSettingsModal } from '../components/user-setting/user-settings-modal';
import { useUserSettingsModalStore } from '../stores/useUserSettingsModalStore';

export const UserSettingsHotKeyProvider = ({ children }: { children: ReactNode }) => {
  const { isUserSettingsModalOpen, closeUserSettingsModal, toggleUserSettingsModal } = useUserSettingsModalStore();

  useHotkeys('ctrl+m', toggleUserSettingsModal, []);
  useHotkeys('esc', () => closeUserSettingsModal, { enabled: isUserSettingsModalOpen }, []);

  return (
    <>
      {children}
      <UserSettingsModal />
    </>
  );
};
