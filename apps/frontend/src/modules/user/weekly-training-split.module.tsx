import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, cn, Progress } from '@libs/components';
import { format } from 'date-fns';
import { Calendar, Clock, Dumbbell, Flame, Heart, Leaf, MoveHorizontal, Repeat, Zap } from 'lucide-react';

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

const getWorkoutTypeIcon = (type: WorkoutType) => {
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

const getWorkoutTypeColor = (type: WorkoutType) => {
  switch (type) {
    case 'push':
      return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
    case 'pull':
      return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700';
    case 'legs':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
    case 'cardio':
      return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
    case 'rest':
      return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
    case 'full-body':
      return 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700';
    case 'mobility':
      return 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
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

export const WeeklyTrainingSplitModule = ({ schedule }: { schedule: ScheduleDay[] }) => {
  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Weekly Training Split
        </CardTitle>
        <CardDescription>Your personalized workout schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {schedule.map((day, index) => {
            const isToday =
              day.date.getDate() === today.getDate() &&
              day.date.getMonth() === today.getMonth() &&
              day.date.getFullYear() === today.getFullYear();

            return (
              <div
                key={index}
                className={cn(
                  'flex-shrink-0 w-[130px] rounded-lg border p-3 flex flex-col items-center relative',
                  isToday ? 'border-primary bg-primary/5' : 'border-border',
                  day.failed && 'border-red-500 bg-red-500/5'
                )}
              >
                {day.failed && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2">
                    Failed
                  </Badge>
                )}
                <div className="text-sm font-medium mb-1">{format(day.date, 'EEE, MMM d')}</div>
                <Badge variant="outline" className={cn('flex items-center gap-1 mb-2', getWorkoutTypeColor(day.type))}>
                  {getWorkoutTypeIcon(day.type)}
                  {getWorkoutTypeLabel(day.type)}
                </Badge>
                <div className="w-full mt-1">
                  <div className="text-xs text-muted-foreground text-center mb-1">
                    {calculateDayProgress(day).completedCount}/{calculateDayProgress(day).totalCount} completed
                  </div>
                  <Progress value={calculateDayProgress(day).percentage} className="h-1" />
                </div>
                {day.timeRemaining !== undefined && day.timeRemaining < 24 && !day.completed && !day.failed && (
                  <div className="mt-2 flex items-center text-xs text-amber-600 dark:text-amber-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeRemaining(day.timeRemaining)} left
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
