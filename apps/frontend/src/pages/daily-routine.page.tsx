import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  Heart,
  Info,
  Leaf,
  MoveHorizontal,
  Repeat,
  Skull,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { PenaltySystem } from '../components/user-penaltiy-system';
import {
  Badge,
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
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@libs/components';
import { PenaltyHistory } from '../components/user-penalty-history';
import { format } from 'date-fns';
import { NextRestDayModule } from '../modules/user/next-rest-day.module';

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

type Stretch = {
  name: string;
  description: string;
  duration: string;
  targetArea: string;
};

type Penalty = {
  id: number;
  date: Date;
  description: string;
  severity: 'minor' | 'moderate' | 'severe';
  consequence: string;
  resolved: boolean;
};

export const DailyRoutinePage = () => {
  const today = new Date();

  const [showPenaltyWarning, setShowPenaltyWarning] = useState(false);

  useEffect(() => {
    if (Math.random() > 0.5) {
      setShowPenaltyWarning(true);
    }
  }, []);

  const [schedule, setSchedule] = useState<ScheduleDay[]>([
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      type: 'push',
      completed: false,
      failed: false,
      timeRemaining: 14, // 14 hours remaining
      exercises: [
        { id: 1, name: 'Push-ups (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 50 },
        { id: 2, name: 'Shoulder Press (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 50 },
        { id: 3, name: 'Tricep Dips (3 sets of 10)', completed: false, sets: 3, reps: '10', xp: 40 },
        { id: 4, name: 'Chest Flyes (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 40 },
        { id: 5, name: 'Lateral Raises (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 30 },
      ],
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      type: 'pull',
      completed: false,
      failed: false,
      timeRemaining: 38, // 38 hours remaining
      exercises: [
        { id: 6, name: 'Pull-ups (3 sets of 8)', completed: false, sets: 3, reps: '8', xp: 60 },
        { id: 7, name: 'Bent-over Rows (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 50 },
        { id: 8, name: 'Bicep Curls (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 40 },
        { id: 9, name: 'Face Pulls (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 40 },
        { id: 10, name: 'Deadlifts (3 sets of 10)', completed: false, sets: 3, reps: '10', xp: 70 },
      ],
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      type: 'legs',
      completed: false,
      failed: false,
      timeRemaining: 62, // 62 hours remaining
      exercises: [
        { id: 11, name: 'Squats (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 60 },
        { id: 12, name: 'Lunges (3 sets of 12 each leg)', completed: false, sets: 3, reps: '12 each leg', xp: 50 },
        { id: 13, name: 'Calf Raises (3 sets of 20)', completed: false, sets: 3, reps: '20', xp: 40 },
        { id: 14, name: 'Leg Press (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 50 },
        { id: 15, name: 'Hamstring Curls (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 40 },
      ],
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      type: 'rest',
      completed: false,
      failed: false,
      timeRemaining: 86, // 86 hours remaining
      exercises: [
        { id: 16, name: 'Light Walking (20 minutes)', completed: false, duration: '20 min', xp: 30 },
        { id: 17, name: 'Full Body Stretching', completed: false, duration: '15 min', xp: 20 },
      ],
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
      type: 'push',
      completed: false,
      failed: false,
      timeRemaining: 110, // 110 hours remaining
      exercises: [
        { id: 18, name: 'Incline Push-ups (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 50 },
        { id: 19, name: 'Overhead Press (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 50 },
        { id: 20, name: 'Tricep Extensions (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 40 },
        { id: 21, name: 'Chest Press (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 50 },
        { id: 22, name: 'Front Raises (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 30 },
      ],
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      type: 'pull',
      completed: false,
      failed: false,
      timeRemaining: 134, // 134 hours remaining
      exercises: [
        { id: 23, name: 'Assisted Pull-ups (3 sets of 10)', completed: false, sets: 3, reps: '10', xp: 50 },
        { id: 24, name: 'Single-Arm Rows (3 sets of 12 each)', completed: false, sets: 3, reps: '12 each', xp: 50 },
        { id: 25, name: 'Hammer Curls (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 40 },
        { id: 26, name: 'Reverse Flyes (3 sets of 15)', completed: false, sets: 3, reps: '15', xp: 40 },
        { id: 27, name: 'Romanian Deadlifts (3 sets of 12)', completed: false, sets: 3, reps: '12', xp: 60 },
      ],
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
      type: 'rest',
      completed: false,
      failed: false,
      timeRemaining: 158, // 158 hours remaining
      exercises: [
        { id: 28, name: 'Yoga Session', completed: false, duration: '30 min', xp: 40 },
        { id: 29, name: 'Foam Rolling', completed: false, duration: '15 min', xp: 20 },
      ],
    },
  ]);

  const [penalties, setPenalties] = useState<Penalty[]>([
    {
      id: 1,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
      description: 'Failed to complete Push Day workout',
      severity: 'minor',
      consequence: "Lost 100 XP and received 'Muscle Fatigue' debuff (-10% strength) for 24 hours",
      resolved: true,
    },
    {
      id: 2,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
      description: 'Missed two consecutive workouts',
      severity: 'moderate',
      consequence: "Lost 250 XP and received 'Weakened' debuff (-15% to all stats) for 48 hours",
      resolved: false,
    },
  ]);

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

  const markWorkoutAsFailed = (dayIndex: number) => {
    setSchedule((prev) => prev.map((day, idx) => (idx === dayIndex ? { ...day, failed: true } : day)));

    const failedDay = schedule[dayIndex];
    const newPenalty: Penalty = {
      id: penalties.length + 1,
      date: new Date(),
      description: `Failed to complete ${getWorkoutTypeLabel(failedDay.type)} workout`,
      severity: 'minor',
      consequence: "Lost 100 XP and received 'Muscle Fatigue' debuff (-10% strength) for 24 hours",
      resolved: false,
    };

    setPenalties([...penalties, newPenalty]);
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

  const todayIndex = schedule.findIndex(
    (day) =>
      day.date.getDate() === today.getDate() &&
      day.date.getMonth() === today.getMonth() &&
      day.date.getFullYear() === today.getFullYear()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Routine</h1>
        <p className="text-muted-foreground">Track your workouts and follow your training split</p>
      </div>

      {showPenaltyWarning && <PenaltySystem onClose={() => setShowPenaltyWarning(false)} />}

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
                  <Badge
                    variant="outline"
                    className={cn('flex items-center gap-1 mb-2', getWorkoutTypeColor(day.type))}
                  >
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

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Workout</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Workouts</TabsTrigger>
          <TabsTrigger value="stretches">Stretching Guide</TabsTrigger>
          <TabsTrigger value="penalties">Penalty History</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          {todayWorkout && (
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
                      {calculateDayProgress(todayWorkout).completedCount} of{' '}
                      {calculateDayProgress(todayWorkout).totalCount} completed
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
                      calculateDayProgress(todayWorkout).completedCount !==
                      calculateDayProgress(todayWorkout).totalCount
                    }
                    variant={
                      calculateDayProgress(todayWorkout).completedCount ===
                      calculateDayProgress(todayWorkout).totalCount
                        ? 'default'
                        : 'outline'
                    }
                  >
                    {calculateDayProgress(todayWorkout).completedCount ===
                    calculateDayProgress(todayWorkout).totalCount ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Complete Workout & Claim {calculateDayProgress(todayWorkout).totalXP} XP
                      </>
                    ) : (
                      'Complete all exercises to finish workout'
                    )}
                  </Button>
                )}

                {!todayWorkout.completed && !todayWorkout.failed && (
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => markWorkoutAsFailed(todayIndex)}
                  >
                    <Skull className="mr-2 h-4 w-4" />
                    Mark as Failed
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
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
                                  {exercise.sets && exercise.reps
                                    ? `${exercise.sets} × ${exercise.reps}`
                                    : exercise.duration}
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
        </TabsContent>

        <TabsContent value="stretches">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Stretching Guide
              </CardTitle>
              <CardDescription>
                Proper stretching improves flexibility, prevents injury, and enhances recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="by-workout">
                <TabsList className="mb-4">
                  <TabsTrigger value="by-workout">By Workout Type</TabsTrigger>
                  <TabsTrigger value="full-body">Full Body Routine</TabsTrigger>
                </TabsList>

                <TabsContent value="by-workout">
                  <div className="grid gap-4 md:grid-cols-2">
                    {(['push', 'pull', 'legs', 'rest'] as WorkoutType[]).map((type) => (
                      <Card key={type} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-base flex items-center">
                            {getWorkoutTypeIcon(type)}
                            <span className="ml-2">For {getWorkoutTypeLabel(type)}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {stretchingSuggestions[type].map((stretch, index) => (
                              <div key={index} className="text-sm">
                                <div className="font-medium">{stretch.name}</div>
                                <div className="text-xs text-muted-foreground">{stretch.description}</div>
                                <div className="text-xs mt-1">
                                  <span className="text-primary">{stretch.duration}</span> • {stretch.targetArea}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="full-body">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">10-Minute Full Body Stretching Routine</CardTitle>
                      <CardDescription>Perfect for warming up or cooling down</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid gap-2 md:grid-cols-2">
                          {[...stretchingSuggestions['full-body'], ...stretchingSuggestions['mobility']].map(
                            (stretch, index) => (
                              <div key={index} className="flex items-start p-2 rounded-md bg-muted/50">
                                <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{stretch.name}</div>
                                  <div className="text-xs text-muted-foreground">{stretch.description}</div>
                                  <div className="text-xs mt-1">
                                    <span className="text-primary">{stretch.duration}</span> • {stretch.targetArea}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-700 dark:text-blue-300">Stretching Tips</h4>
                              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1 list-disc list-inside">
                                <li>Hold each stretch for 20-30 seconds</li>
                                <li>Breathe deeply and relax into each stretch</li>
                                <li>Never bounce or force a stretch</li>
                                <li>Stretch to the point of tension, not pain</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="penalties">
          <PenaltyHistory penalties={penalties} />
        </TabsContent>
      </Tabs>

      <NextRestDayModule schedule={schedule} />
    </div>
  );
};
