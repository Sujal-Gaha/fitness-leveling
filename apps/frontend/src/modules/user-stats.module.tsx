import { Card, CardContent, CardHeader, CardTitle, Progress } from '@libs/components';
import { Award, Flame, TrendingUp } from 'lucide-react';

export const UserStats = () => {
  // Mock data - in a real app, this would come from your backend
  const userStats = {
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    streak: 7,
    workoutsCompleted: 48,
  };

  const xpPercentage = (userStats.xp / userStats.xpToNextLevel) * 100;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Level</CardTitle>
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userStats.streak} days</div>
          <p className="text-xs text-muted-foreground mt-2">Keep it up! Your longest streak was 14 days.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Workouts Completed</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userStats.workoutsCompleted}</div>
          <p className="text-xs text-muted-foreground mt-2">You've earned 9,600 XP from workouts</p>
        </CardContent>
      </Card>
    </div>
  );
};
