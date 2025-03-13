import { Card, CardContent, CardHeader, CardTitle } from '@libs/components';
import { Flame } from 'lucide-react';

export const UserStreakTrackerModule = ({ streak }: { streak: number }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
        <Flame className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{streak} days</div>
        <p className="text-xs text-muted-foreground mt-2">Keep it up! Your longest streak was 14 days.</p>
      </CardContent>
    </Card>
  );
};
