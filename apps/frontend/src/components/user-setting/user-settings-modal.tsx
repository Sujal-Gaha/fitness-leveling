import { Button, Dialog, DialogClose, DialogContent, DialogTitle, Switch } from '@libs/components';
import { useUserSettingsModalStore } from '../../stores/useUserSettingsModalStore';
import { useState } from 'react';
import { X } from 'lucide-react';
import { GeneralSection } from './general-section';
import { UserProfileSection } from './user-profile-section';

type ActiveSection = 'GENERAL' | 'USER_PROFILE';

type Sections = {
  id: number;
  value: ActiveSection;
  label: string;
};

export const UserSettingsModal = () => {
  const { isUserSettingsModalOpen, setUserSettingsModalOpen } = useUserSettingsModalStore();
  const [activeSection, setActiveSection] = useState<ActiveSection>('GENERAL');

  const sections: Sections[] = [
    { id: 1, value: 'GENERAL', label: 'General' },
    { id: 2, value: 'USER_PROFILE', label: 'User Profile' },
  ];

  const getActiveSection = () => {
    if (activeSection === 'GENERAL') return <GeneralSection />;
    if (activeSection === 'USER_PROFILE') return <UserProfileSection />;
  };

  return (
    <Dialog open={isUserSettingsModalOpen} onOpenChange={setUserSettingsModalOpen}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 overflow-hidden">
        <div className="flex h-[600px]">
          <div className="w-64 bg-muted/30 border-r border-border overflow-y-auto">
            <div className="p-4">
              <DialogTitle className="mb-6">Options</DialogTitle>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`w-full text-left px-3 py-2 rounded-sm text-sm font-medium ${
                      activeSection === section.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveSection(section.value)}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <DialogTitle>
                {sections.map((section) => (section.value === activeSection ? section.label : ''))}
              </DialogTitle>
              <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="p-6 space-y-6">{getActiveSection()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
