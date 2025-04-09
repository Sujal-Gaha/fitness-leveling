import { Card, CardContent, CardHeader, CardTitle } from '@libs/components';
import { TrendingUp } from 'lucide-react';

export const UserWorkoutStatsModule = ({ workoutsCompleted }: { workoutsCompleted: number }) => {
  return (
    <Card className="dark:border-electric/50 dark:shadow-[0_0_15px_rgba(157,78,221,0.3)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Workouts Completed</CardTitle>
        <TrendingUp className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{workoutsCompleted}</div>
        <p className="text-xs text-muted-foreground mt-2">You've earned 9,600 XP from workouts</p>
      </CardContent>
    </Card>
  );
};
