import { Badge } from '@libs/components';
import { Trophy } from 'lucide-react';
import { Achievement, UserAchievementCardModule } from '../modules/user/user-achievement-card.module';

export const AchievementsPage = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Early Bird',
      description: 'Complete 10 morning workouts',
      progress: 100,
      total: 10,
      unlocked: true,
      xpReward: 200,
      icon: '🌅',
    },
    {
      id: 2,
      title: 'Consistency King',
      description: 'Maintain a 7-day streak',
      progress: 100,
      total: 7,
      unlocked: true,
      xpReward: 300,
      icon: '👑',
    },
    {
      id: 3,
      title: 'Strength Master',
      description: 'Complete 20 strength workouts',
      progress: 15,
      total: 20,
      unlocked: false,
      xpReward: 400,
      icon: '💪',
    },
    {
      id: 4,
      title: 'Cardio Champion',
      description: 'Burn 5000 calories in cardio workouts',
      progress: 3200,
      total: 5000,
      unlocked: false,
      xpReward: 500,
      icon: '🏃',
    },
    {
      id: 5,
      title: 'Flexibility Guru',
      description: 'Complete 15 flexibility sessions',
      progress: 8,
      total: 15,
      unlocked: false,
      xpReward: 350,
      icon: '🧘',
    },
    {
      id: 6,
      title: 'Workout Explorer',
      description: 'Try 10 different workout types',
      progress: 6,
      total: 10,
      unlocked: false,
      xpReward: 250,
      icon: '🧭',
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">Complete challenges and earn rewards</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Trophy className="h-3.5 w-3.5" />
          <span>
            {unlockedCount}/{totalCount} Unlocked
          </span>
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <UserAchievementCardModule achievement={achievement} />
        ))}
      </div>
    </div>
  );
};
