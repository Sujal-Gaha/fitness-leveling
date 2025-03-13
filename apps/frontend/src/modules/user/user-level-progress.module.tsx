import { Card, CardContent, CardHeader, CardTitle, Progress } from '@libs/components';
import { Award } from 'lucide-react';

export type TUserStats = {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  workoutsCompleted: number;
};

export const UserLevelProgressModule = ({ userStats }: { userStats: TUserStats }) => {
  const xpPercentage = Math.floor((userStats.xp / userStats.xpToNextLevel) * 100);

  return (
    <Card className="dark:border-electric/50 dark:shadow-[0_0_15px_rgba(157,78,221,0.3)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 dark:bg-electric/10">
        <CardTitle className="text-sm font-medium dark:electric-text">Level</CardTitle>
        <Award className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{userStats.level}</div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>
              XP: {userStats.xp}/{userStats.xpToNextLevel}
            </span>
            <span>{Math.round(xpPercentage)}%</span>
          </div>
          <Progress value={xpPercentage} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {userStats.xpToNextLevel - userStats.xp} XP until next level
        </p>
      </CardContent>
    </Card>
  );
};
