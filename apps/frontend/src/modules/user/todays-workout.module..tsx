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
import { AlertTriangle, Calendar, CheckCircle2, Clock, Heart } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { DailyRoutine, ScheduleDay, Stretch, WorkoutType } from '../../utils/DailyRoutine';
import { formatTimeRemaining } from '../../utils/time';

export const TodaysWorkoutModule = ({
  dailyRoutine,
  setSchedule,
  stretchingSuggestions,
}: {
  dailyRoutine: DailyRoutine;
  setSchedule: Dispatch<SetStateAction<ScheduleDay[]>>;
  stretchingSuggestions: Record<WorkoutType, Stretch[]>;
}) => {
  const { todayIndex } = dailyRoutine.getTodayIndex();
  const { todayWorkout } = dailyRoutine.getTodayWorkout();
  const calculateDayProgress = dailyRoutine.calculateDayProgress;
  const getWorkoutTypeIcon = dailyRoutine.getWorkoutTypeIcon;
  const getWorkoutTypeLabel = dailyRoutine.getWorkoutTypeLabel;

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
              {dailyRoutine.calculateDayProgress(todayWorkout).completedCount} of{' '}
              {dailyRoutine.calculateDayProgress(todayWorkout).totalCount} completed
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
