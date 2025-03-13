import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Badge, Button } from '@libs/components';
import { Clock, Dumbbell, Zap } from 'lucide-react';

interface WorkoutSuggestionsProps {
  limit?: number;
}

export function WorkoutSuggestions({ limit }: WorkoutSuggestionsProps) {
  const workouts = [
    {
      id: 1,
      title: 'Upper Body Strength',
      description: 'Focus on chest, shoulders, and arms',
      duration: 45,
      difficulty: 'Intermediate',
      xpReward: 150,
      tags: ['Strength', 'Upper Body'],
      image: '/placeholder.svg?height=200&width=400',
    },
    {
      id: 2,
      title: 'HIIT Cardio Blast',
      description: 'High intensity interval training for maximum calorie burn',
      duration: 30,
      difficulty: 'Advanced',
      xpReward: 200,
      tags: ['Cardio', 'HIIT'],
      image: '/placeholder.svg?height=200&width=400',
    },
    {
      id: 3,
      title: 'Core Stability',
      description: 'Build a strong foundation with these core exercises',
      duration: 25,
      difficulty: 'Beginner',
      xpReward: 100,
      tags: ['Core', 'Stability'],
      image: '/placeholder.svg?height=200&width=400',
    },
    {
      id: 4,
      title: 'Lower Body Power',
      description: 'Squats, lunges, and more for leg strength',
      duration: 40,
      difficulty: 'Intermediate',
      xpReward: 150,
      tags: ['Strength', 'Lower Body'],
      image: '/placeholder.svg?height=200&width=400',
    },
    {
      id: 5,
      title: 'Mobility Flow',
      description: 'Improve flexibility and joint health',
      duration: 35,
      difficulty: 'Beginner',
      xpReward: 120,
      tags: ['Mobility', 'Recovery'],
      image: '/placeholder.svg?height=200&width=400',
    },
  ];

  const displayWorkouts = limit ? workouts.slice(0, limit) : workouts;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">AI Workout Suggestions</h2>
        {limit && (
          <Button variant="link" className="gap-1">
            View all <Zap className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayWorkouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden">
            <img src={workout.image || '/placeholder.svg'} alt={workout.title} className="h-48 w-full object-cover" />
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{workout.title}</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  +{workout.xpReward} XP
                </Badge>
              </div>
              <CardDescription>{workout.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 pb-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {workout.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  <span>{workout.difficulty}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full">Start Workout</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
