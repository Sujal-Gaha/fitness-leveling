import { Calendar, Clock, Dumbbell, Flame, Heart, Leaf, MoveHorizontal, Repeat, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PenaltySystem } from '../components/user-penaltiy-system';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@libs/components';
import { PenaltyHistory } from '../components/user-penalty-history';
import { format } from 'date-fns';
import { NextRestDayModule } from '../modules/user/next-rest-day.module';
import { UpcomingWorkoutsModule } from '../modules/user/upcoming-workouts.module';
import { TodaysWorkoutModule } from '../modules/user/todays-workout.module.';
import { StretchingGuideModule } from '../modules/user/stretching-guide.module';

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

  const penalties: Penalty[] = [
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
  ];

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
          <TodaysWorkoutModule schedule={schedule} setSchedule={setSchedule} />
        </TabsContent>

        <TabsContent value="upcoming">
          <UpcomingWorkoutsModule schedule={schedule} />
        </TabsContent>

        <TabsContent value="stretches">
          <StretchingGuideModule stretchingSuggestions={stretchingSuggestions} />
        </TabsContent>

        <TabsContent value="penalties">
          <PenaltyHistory penalties={penalties} />
        </TabsContent>
      </Tabs>

      <NextRestDayModule schedule={schedule} />
    </div>
  );
};
