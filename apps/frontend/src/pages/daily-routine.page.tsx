import { ReactNode, useEffect, useState } from 'react';
import { PenaltySystem } from '../components/user-penaltiy-system';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@libs/components';
import { PenaltyHistory } from '../components/user-penalty-history';
import { NextRestDayModule } from '../modules/user/next-rest-day.module';
import { UpcomingWorkoutsModule } from '../modules/user/upcoming-workouts.module';
import { TodaysWorkoutModule } from '../modules/user/todays-workout.module.';
import { StretchingGuideModule } from '../modules/user/stretching-guide.module';
import { WeeklyTrainingSplitModule } from '../modules/user/weekly-training-split.module';
import { ScheduleDay, Stretch, WorkoutType } from '../utils/DailyRoutine';
import { Penalty } from '../utils/Penalty';

type TabItem = {
  label: string;
  value: string;
  Component: ReactNode;
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

  const tabItems: TabItem[] = [
    {
      label: "Today's Workout",
      value: 'today',
      Component: <TodaysWorkoutModule schedule={schedule} setSchedule={setSchedule} />,
    },
    { label: 'Upcoming Workouts', value: 'upcoming', Component: <UpcomingWorkoutsModule schedule={schedule} /> },
    {
      label: 'Stretching Guide',
      value: 'stretches',
      Component: <StretchingGuideModule stretchingSuggestions={stretchingSuggestions} schedule={schedule} />,
    },
    { label: 'Penalty History', value: 'penalties', Component: <PenaltyHistory penalties={penalties} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Routine</h1>
        <p className="text-muted-foreground">Track your workouts and follow your training split</p>
      </div>

      {showPenaltyWarning && <PenaltySystem onClose={() => setShowPenaltyWarning(false)} />}

      <WeeklyTrainingSplitModule schedule={schedule} />

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          {tabItems.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabItems.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.Component}
          </TabsContent>
        ))}
      </Tabs>

      <NextRestDayModule schedule={schedule} />
    </div>
  );
};
