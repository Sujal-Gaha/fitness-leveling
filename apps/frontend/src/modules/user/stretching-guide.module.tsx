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
import { Dumbbell, Flame, Heart, Info, Leaf, MoveHorizontal, Repeat, Zap } from 'lucide-react';

type WorkoutType = 'push' | 'pull' | 'legs' | 'cardio' | 'rest' | 'full-body' | 'mobility';

type Stretch = {
  name: string;
  description: string;
  duration: string;
  targetArea: string;
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

export const StretchingGuideModule = ({
  stretchingSuggestions,
}: {
  stretchingSuggestions: Record<WorkoutType, Stretch[]>;
}) => {
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
