import { Info, Leaf } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@libs/components';
import { format } from 'date-fns';
import { DailyRoutine, ScheduleDay } from '../../utils/DailyRoutine';

export const NextRestDayModule = ({ schedule }: { schedule: ScheduleDay[] }) => {
  const dailyRoutine = new DailyRoutine(schedule);

  const { nextRestDay } = dailyRoutine.getNextRestDay();

  if (!nextRestDay) return null;

  return (
    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-green-800 dark:text-green-300">
          <Leaf className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
          Next Rest Day
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-800 dark:text-green-300">
              Your next scheduled rest day is on{' '}
              <span className="font-medium">{format(nextRestDay.date, 'EEE, MMM d')}</span>
            </p>
            <p className="text-sm text-green-700/80 dark:text-green-400/80 mt-1">
              Remember that recovery is just as important as training!
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="border-green-300 dark:border-green-700">
                  <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Rest days allow your muscles to recover and grow stronger. Light activity like walking, stretching, or
                  yoga is encouraged.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {nextRestDay.exercises.map((activity, index) => (
            <div
              key={index}
              className="text-sm p-2 rounded-md bg-green-100/70 dark:bg-green-800/30 text-green-800 dark:text-green-300"
            >
              <div className="font-medium">{activity.name}</div>
              <div className="text-xs text-green-700/80 dark:text-green-400/80">
                {activity.duration} • +{activity.xp} XP
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
