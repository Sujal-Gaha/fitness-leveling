import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from '@libs/components';
import { Award, Lock, Unlock } from 'lucide-react';

export type Achievement = {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  unlocked: boolean;
  xpReward: number;
  icon: string;
};

export const UserAchievementCardModule = ({ achievement }: { achievement: Achievement }) => {
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
};
