import { Button, Switch } from '@libs/components';

export const GeneralSection = () => {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Notifications</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Turn this off to prevent the app from sending notifications</p>
          <Switch id="auto-updates" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Help</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Learn how to use the app and get help from the community.</p>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </div>
      </div>
    </>
  );
};
