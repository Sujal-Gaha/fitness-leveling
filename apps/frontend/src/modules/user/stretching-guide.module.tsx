import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@libs/components';
import { Heart, Info } from 'lucide-react';
import { ScheduleDay, Stretch, StretchingGuide, WorkoutType } from '../../utils/DailyRoutine';

export const StretchingGuideModule = ({
  stretchingSuggestions,
  schedule,
}: {
  stretchingSuggestions: Record<WorkoutType, Stretch[]>;
  schedule: ScheduleDay[];
}) => {
  const stretchingGuide = new StretchingGuide(schedule, stretchingSuggestions);

  const getWorkoutTypeLabel = stretchingGuide.getWorkoutTypeLabel;
  const getWorkoutTypeIcon = stretchingGuide.getWorkoutTypeIcon;

  return (
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
  );
};
