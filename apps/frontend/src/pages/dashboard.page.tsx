import { PopularPrompts } from '../modules/popular-prompts';
import { UserWorkoutStatsModule } from '../modules/user/user-workout-stats.module';
import { UserStreakTrackerModule } from '../modules/user/user-streak-tracker.module';
import { TUserStats, UserLevelProgressModule } from '../modules/user/user-level-progress.module';

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
        <UserLevelProgressModule userStats={userStats} />
        <UserStreakTrackerModule streak={userStats.streak} />
        <UserWorkoutStatsModule workoutsCompleted={userStats.workoutsCompleted} />
      </div>

      <PopularPrompts />
    </div>
  );
};
