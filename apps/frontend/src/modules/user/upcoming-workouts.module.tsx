import { Clock, Dumbbell, Flame, Heart, Leaf, MoveHorizontal, Repeat, Zap } from 'lucide-react';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, ScrollArea } from '@libs/components';
import { format } from 'date-fns';

type WorkoutType = 'push' | 'pull' | 'legs' | 'cardio' | 'rest' | 'full-body' | 'mobility';

type ScheduleDay = {
  date: Date;
  type: WorkoutType;
  completed: boolean;
  failed: boolean;
  timeRemaining?: number;
  exercises: Exercise[];
};

type Exercise = {
  id: number;
  name: string;
  completed: boolean;
  sets?: number;
  reps?: string;
  duration?: string;
  xp: number;
};

export const getWorkoutTypeIcon = (type: WorkoutType) => {
  switch (type) {
    case 'push':
      return <Dumbbell className="h-5 w-5 text-blue-500" />;
    case 'pull':
      return <MoveHorizontal className="h-5 w-5 text-purple-500" />;
    case 'legs':
      return <Zap className="h-5 w-5 text-yellow-500" />;
    case 'cardio':
      return <Flame className="h-5 w-5 text-red-500" />;
    case 'rest':
      return <Leaf className="h-5 w-5 text-green-500" />;
    case 'full-body':
      return <Repeat className="h-5 w-5 text-indigo-500" />;
    case 'mobility':
      return <Heart className="h-5 w-5 text-pink-500" />;
    default:
      return <Dumbbell className="h-5 w-5" />;
  }
};

const getWorkoutTypeLabel = (type: WorkoutType) => {
  switch (type) {
    case 'push':
      return 'Push Day';
    case 'pull':
      return 'Pull Day';
    case 'legs':
      return 'Leg Day';
    case 'cardio':
      return 'Cardio Day';
    case 'rest':
      return 'Rest Day';
    case 'full-body':
      return 'Full Body';
    case 'mobility':
      return 'Mobility';
    default:
      return type;
  }
};

const calculateDayProgress = (day: ScheduleDay) => {
  const completedCount = day.exercises.filter((ex) => ex.completed).length;
  const totalCount = day.exercises.length;
  return {
    completedCount,
    totalCount,
    percentage: totalCount > 0 ? (completedCount / totalCount) * 100 : 0,
    totalXP: day.exercises.reduce((sum, ex) => sum + ex.xp, 0),
    earnedXP: day.exercises.filter((ex) => ex.completed).reduce((sum, ex) => sum + ex.xp, 0),
  };
};

const formatTimeRemaining = (hours: number) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }
  if (hours < 24) {
    return `${Math.floor(hours)} hours`;
  }
  return `${Math.floor(hours / 24)} days`;
};

export const UpcomingWorkoutsModule = ({ schedule }: { schedule: ScheduleDay[] }) => {
  const today = new Date();

  const todayIndex = schedule.findIndex(
    (day) =>
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Workouts</CardTitle>
        <CardDescription>Preview your next workouts in your training split</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {schedule
              .filter((_, index) => index > todayIndex)
              .slice(0, 5)
              .map((day, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-base flex items-center">
                          {getWorkoutTypeIcon(day.type)}
                          <span className="ml-2">{getWorkoutTypeLabel(day.type)}</span>
                        </CardTitle>
                        <CardDescription>{format(day.date, 'EEE, MMM d')}</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        +{calculateDayProgress(day).totalXP} XP
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {day.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className="text-sm flex justify-between">
                          <span>{exercise.name}</span>
                          <span className="text-muted-foreground">
                            {exercise.sets && exercise.reps ? `${exercise.sets} × ${exercise.reps}` : exercise.duration}
                          </span>
                        </div>
                      ))}
                    </div>

                    {day.timeRemaining !== undefined && (
                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Due in {formatTimeRemaining(day.timeRemaining)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
