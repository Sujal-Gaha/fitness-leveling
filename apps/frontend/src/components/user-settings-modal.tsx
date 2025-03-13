import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Switch,
} from '@libs/components';
import { useUserSettingsModalStore } from '../stores/useUserSettingsModalStore';

export const UserSettingsModal = () => {
  const { isUserSettingsModalOpen, setUserSettingsModalOpen } = useUserSettingsModalStore();

  return (
    <Dialog open={isUserSettingsModalOpen} onOpenChange={setUserSettingsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
          <DialogDescription>Manage your account settings and preferences.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notifications" className="text-right">
              Notifications
            </Label>
            <div className="col-span-3">
              <Switch
                id="notifications"
                checked
                // onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
