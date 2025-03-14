import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from '@libs/components';
import { Award, Lock, Trophy, Unlock } from 'lucide-react';

export const AchievementsPage = () => {
  const achievements = [
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
        {achievements.map((achievement) => {
          const progressPercentage = (achievement.progress / achievement.total) * 100;

          return (
            <Card key={achievement.id} className={achievement.unlocked ? 'border-primary/50' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl">{achievement.icon}</div>
                    <CardTitle>{achievement.title}</CardTitle>
                  </div>
                  {achievement.unlocked ? (
                    <Badge className="bg-primary text-primary-foreground">
                      <Unlock className="mr-1 h-3 w-3" />
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <Lock className="mr-1 h-3 w-3" />
                      Locked
                    </Badge>
                  )}
                </div>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Progress: {achievement.progress}/{achievement.total}
                    </span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="text-sm text-muted-foreground">
                    {achievement.unlocked ? (
                      <span className="flex items-center text-primary">
                        <Award className="mr-1 h-4 w-4" />
                        Earned {achievement.xpReward} XP
                      </span>
                    ) : (
                      <span>Reward: {achievement.xpReward} XP</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
