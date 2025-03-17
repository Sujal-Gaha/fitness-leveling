import { Clock } from 'lucide-react';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, ScrollArea } from '@libs/components';
import { format } from 'date-fns';
import { DailyRoutine, ScheduleDay } from '../../utils/DailyRoutine';
import { formatTimeRemaining } from '../../utils/time';

export const UpcomingWorkoutsModule = ({ schedule }: { schedule: ScheduleDay[] }) => {
  const dailyRoutine = new DailyRoutine(schedule);

  const { todayIndex } = dailyRoutine.getTodayIndex();
  const calculateDayProgress = dailyRoutine.calculateDayProgress;
  const getWorkoutTypeIcon = dailyRoutine.getWorkoutTypeIcon;
  const getWorkoutTypeLabel = dailyRoutine.getWorkoutTypeLabel;

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
