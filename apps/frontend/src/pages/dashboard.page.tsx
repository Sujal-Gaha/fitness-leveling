import { Card, CardContent, CardHeader, CardTitle, Progress } from '@libs/components';
import { Award, Flame, TrendingUp } from 'lucide-react';
import { PopularPrompts } from '../modules/popular-prompts';

type TUserStats = {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  workoutsCompleted: number;
};

const UserLevelProgressCard = ({ userStats }: { userStats: TUserStats }) => {
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

const UserStreakTracker = ({ streak }: { streak: number }) => {
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

const UserWorkoutStats = ({ workoutsCompleted }: { workoutsCompleted: number }) => {
  return (
    <Card>
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

export const DashboardPage = () => {
  const userStats: TUserStats = {
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    streak: 7,
    workoutsCompleted: 48,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your fitness journey!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <UserLevelProgressCard userStats={userStats} />
        <UserStreakTracker streak={userStats.streak} />
        <UserWorkoutStats workoutsCompleted={userStats.workoutsCompleted} />
      </div>

      <PopularPrompts />
    </div>
  );
};
