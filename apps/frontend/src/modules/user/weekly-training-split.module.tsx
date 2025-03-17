import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, cn, Progress } from '@libs/components';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { DailyRoutine, ScheduleDay } from '../../utils/DailyRoutine';
import { formatTimeRemaining } from '../../utils/time';

export const WeeklyTrainingSplitModule = ({ schedule }: { schedule: ScheduleDay[] }) => {
  const today = new Date();

  const dailyRoutine = new DailyRoutine(schedule);

  const getWorkoutTypeColor = dailyRoutine.getWorkoutTypeColor;
  const getWorkoutTypeIcon = dailyRoutine.getWorkoutTypeIcon;
  const getWorkoutTypeLabel = dailyRoutine.getWorkoutTypeLabel;
  const calculateDayProgress = dailyRoutine.calculateDayProgress;

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
