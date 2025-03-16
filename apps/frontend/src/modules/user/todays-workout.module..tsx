import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  Progress,
} from '@libs/components';
import { format } from 'date-fns';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  Heart,
  Leaf,
  MoveHorizontal,
  Repeat,
  Zap,
} from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Stretch = {
  name: string;
  description: string;
  duration: string;
  targetArea: string;
};

const stretchingSuggestions: Record<WorkoutType, Stretch[]> = {
  push: [
    {
      name: 'Chest Stretch',
      description: 'Extend arm against wall and rotate away',
      duration: '30 sec each side',
      targetArea: 'Chest',
    },
    {
      name: 'Tricep Stretch',
      description: 'Reach arm overhead and pull elbow',
      duration: '30 sec each arm',
      targetArea: 'Triceps',
    },
    {
      name: 'Shoulder Stretch',
      description: 'Pull arm across chest',
      duration: '30 sec each arm',
      targetArea: 'Shoulders',
    },
  ],
  pull: [
    {
      name: 'Lat Stretch',
      description: 'Side bend with arm overhead',
      duration: '30 sec each side',
      targetArea: 'Lats',
    },
    {
      name: 'Bicep Stretch',
      description: 'Extend arm with palm up',
      duration: '30 sec each arm',
      targetArea: 'Biceps',
    },
    {
      name: 'Upper Back Stretch',
      description: 'Clasp hands forward and round upper back',
      duration: '30 seconds',
      targetArea: 'Upper back',
    },
  ],
  legs: [
    {
      name: 'Quad Stretch',
      description: 'Pull foot to buttocks while standing',
      duration: '30 sec each leg',
      targetArea: 'Quadriceps',
    },
    {
      name: 'Hamstring Stretch',
      description: 'Bend forward at hips with straight legs',
      duration: '30 seconds',
      targetArea: 'Hamstrings',
    },
    {
      name: 'Calf Stretch',
      description: 'Step back with straight leg',
      duration: '30 sec each leg',
      targetArea: 'Calves',
    },
  ],
  cardio: [
    {
      name: 'Hip Flexor Stretch',
      description: 'Lunge forward and push hips forward',
      duration: '30 sec each side',
      targetArea: 'Hip flexors',
    },
    {
      name: 'Calf Stretch',
      description: 'Step back with straight leg',
      duration: '30 sec each leg',
      targetArea: 'Calves',
    },
    {
      name: 'Quad Stretch',
      description: 'Pull foot to buttocks while standing',
      duration: '30 sec each leg',
      targetArea: 'Quadriceps',
    },
  ],
  rest: [
    {
      name: 'Full Body Stretch',
      description: 'Gentle full body stretching routine',
      duration: '10-15 minutes',
      targetArea: 'Full body',
    },
    {
      name: 'Foam Rolling',
      description: 'Roll major muscle groups',
      duration: '10 minutes',
      targetArea: 'Full body',
    },
    { name: 'Yoga Flow', description: 'Gentle yoga sequence', duration: '20 minutes', targetArea: 'Full body' },
  ],
  'full-body': [
    {
      name: "World's Greatest Stretch",
      description: 'Lunge with rotation and reach',
      duration: '30 sec each side',
      targetArea: 'Full body',
    },
    {
      name: "Child's Pose",
      description: 'Kneel and reach forward',
      duration: '30 seconds',
      targetArea: 'Back, shoulders',
    },
    {
      name: 'Standing Forward Fold',
      description: 'Bend at hips with soft knees',
      duration: '30 seconds',
      targetArea: 'Hamstrings, back',
    },
  ],
  mobility: [
    {
      name: 'Hip Circles',
      description: 'Circular motion with hips',
      duration: '30 sec each direction',
      targetArea: 'Hips',
    },
    {
      name: 'Shoulder Rolls',
      description: 'Roll shoulders forward and backward',
      duration: '30 sec each direction',
      targetArea: 'Shoulders',
    },
    {
      name: 'Ankle Rotations',
      description: 'Rotate ankles in circles',
      duration: '30 sec each ankle',
      targetArea: 'Ankles',
    },
  ],
};

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

export const TodaysWorkoutModule = ({
  schedule,
  setSchedule,
}: {
  schedule: ScheduleDay[];
  setSchedule: Dispatch<SetStateAction<ScheduleDay[]>>;
}) => {
  const today = new Date();
  const todayIndex = schedule.findIndex(
    (day) =>
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
  );

  const todayWorkout = schedule.find(
    (day) =>
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
  );

  const toggleExercise = (dayIndex: number, exerciseId: number) => {
    setSchedule((prev) =>
      prev.map((day, idx) =>
        idx === dayIndex
          ? {
              ...day,
              exercises: day.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex)),
            }
          : day
      )
    );
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

  if (!todayWorkout) return null;

  return (
    <Card
      className={cn(
        todayWorkout.failed ? 'border-red-500' : '',
        todayWorkout.timeRemaining && todayWorkout.timeRemaining < 6 ? 'border-amber-500' : ''
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center">
              {getWorkoutTypeIcon(todayWorkout.type)}
              <span className="ml-2">{getWorkoutTypeLabel(todayWorkout.type)}</span>
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="mr-1 h-4 w-4" />
              {format(todayWorkout.date, 'EEE, MMM d')}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">XP Progress</div>
            <div className="text-2xl font-bold text-primary">
              {calculateDayProgress(todayWorkout).earnedXP}/{calculateDayProgress(todayWorkout).totalXP}
            </div>
          </div>
        </div>

        {todayWorkout.timeRemaining !== undefined && !todayWorkout.completed && !todayWorkout.failed && (
          <div
            className={cn(
              'mt-2 flex items-center justify-between rounded-md px-3 py-2',
              todayWorkout.timeRemaining < 6
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : todayWorkout.timeRemaining < 12
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            )}
          >
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="font-medium">Time Remaining:</span>
              <span className="ml-2">{formatTimeRemaining(todayWorkout.timeRemaining)}</span>
            </div>
            {todayWorkout.timeRemaining < 6 && (
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Warning: Penalty Risk</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              {calculateDayProgress(todayWorkout).completedCount} of {calculateDayProgress(todayWorkout).totalCount}{' '}
              completed
            </span>
            <span>{Math.round(calculateDayProgress(todayWorkout).percentage)}%</span>
          </div>
          <Progress value={calculateDayProgress(todayWorkout).percentage} className="h-2" />
        </div>

        <div className="space-y-4">
          {todayWorkout.exercises.map((exercise) => (
            <div key={exercise.id} className="flex items-center space-x-4">
              <Checkbox
                id={`exercise-${exercise.id}`}
                checked={exercise.completed}
                onCheckedChange={() => toggleExercise(todayIndex, exercise.id)}
                disabled={todayWorkout.failed}
              />
              <label
                htmlFor={`exercise-${exercise.id}`}
                className={`flex flex-1 items-center justify-between cursor-pointer ${
                  exercise.completed ? 'line-through text-muted-foreground' : ''
                } ${todayWorkout.failed ? 'opacity-50' : ''}`}
              >
                <span>{exercise.name}</span>
                <span className="text-sm font-medium">+{exercise.xp} XP</span>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <h3 className="text-sm font-medium flex items-center mb-2">
            <Heart className="h-4 w-4 mr-1 text-red-500" />
            Recommended Stretches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {stretchingSuggestions[todayWorkout.type].map((stretch, index) => (
              <div key={index} className="text-sm p-2 rounded-md bg-muted/50">
                <div className="font-medium">{stretch.name}</div>
                <div className="text-xs text-muted-foreground">{stretch.description}</div>
                <div className="text-xs mt-1">
                  <span className="text-primary">{stretch.duration}</span> • {stretch.targetArea}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        {!todayWorkout.failed && (
          <Button
            className="w-full sm:flex-1"
            disabled={
              calculateDayProgress(todayWorkout).completedCount !== calculateDayProgress(todayWorkout).totalCount
            }
            variant={
              calculateDayProgress(todayWorkout).completedCount === calculateDayProgress(todayWorkout).totalCount
                ? 'default'
                : 'outline'
            }
          >
            {calculateDayProgress(todayWorkout).completedCount === calculateDayProgress(todayWorkout).totalCount ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Complete Workout & Claim {calculateDayProgress(todayWorkout).totalXP} XP
              </>
            ) : (
              'Complete all exercises to finish workout'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
