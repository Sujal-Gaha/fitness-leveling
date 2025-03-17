import { Dumbbell, Flame, Heart, Leaf, MoveHorizontal, Repeat, Zap } from 'lucide-react';

export type WorkoutType = 'push' | 'pull' | 'legs' | 'cardio' | 'rest' | 'full-body' | 'mobility';

export type ScheduleDay = {
  date: Date;
  type: WorkoutType;
  completed: boolean;
  failed: boolean;
  timeRemaining?: number;
  exercises: Exercise[];
};

export type Exercise = {
  id: number;
  name: string;
  completed: boolean;
  sets?: number;
  reps?: string;
  duration?: string;
  xp: number;
};

export type Stretch = {
  name: string;
  description: string;
  duration: string;
  targetArea: string;
};

export class DailyRoutine {
  private schedule: ScheduleDay[] = [];
  private today = new Date();

  constructor(schedule: ScheduleDay[]) {
    this.schedule = schedule;
  }

  getNextRestDay = () => {
    const nextRestDay = this.schedule.find((day) => day.type === 'rest' && day.date > this.today);
    return { nextRestDay };
  };

  getWorkoutTypeIcon = (type: WorkoutType) => {
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

  getWorkoutTypeColor = (type: WorkoutType) => {
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

  getWorkoutTypeLabel = (type: WorkoutType) => {
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

  getTodayIndex = () => {
    const todayIndex = this.schedule.findIndex(
      (day) =>
        day.date.getDate() === this.today.getDate() &&
        day.date.getMonth() === this.today.getMonth() &&
        day.date.getFullYear() === this.today.getFullYear()
    );

    return { todayIndex };
  };

  getTodayWorkout = () => {
    const todayWorkout = this.schedule.find(
      (day) =>
        day.date.getDate() === this.today.getDate() &&
        day.date.getMonth() === this.today.getMonth() &&
        day.date.getFullYear() === this.today.getFullYear()
    );

    return { todayWorkout };
  };

  calculateDayProgress = (day: ScheduleDay) => {
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
}

export class StretchingGuide extends DailyRoutine {
  private stretchingSuggestions: Record<WorkoutType, Stretch[]>;

  constructor(schedule: ScheduleDay[], stretches: Record<WorkoutType, Stretch[]>) {
    super(schedule);
    this.stretchingSuggestions = stretches;
  }
}
