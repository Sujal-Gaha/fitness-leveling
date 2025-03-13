import { useState } from 'react';
import { Brain, CheckCircle2, Loader2, Plus, Wand2 } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Textarea,
} from '@libs/components';

export const AIGeneratorPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [addedToRoutine, setAddedToRoutine] = useState(false);

  // Function to simulate AI generating a workout
  const generateWorkout = () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setShowWorkout(false);
    setAddedToRoutine(false);

    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowWorkout(true);
    }, 1500);
  };

  // Function to add the workout to the daily routine
  const addToRoutine = () => {
    setAddedToRoutine(true);
    setTimeout(() => {
      setAddedToRoutine(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Workout Generator</h1>
        <p className="text-muted-foreground">Create personalized workouts with AI assistance</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                AI Workout Generator
              </CardTitle>
              <CardDescription>
                Describe the workout you want, and our AI will create a personalized routine
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">What kind of workout are you looking for?</Label>
              <div className="flex space-x-2">
                <Textarea
                  id="prompt"
                  placeholder="e.g., 'A 30-minute HIIT workout for fat burning' or 'A beginner-friendly core workout'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1"
                  rows={3}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Try to include details like duration, intensity, target areas, or fitness goals
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={generateWorkout} disabled={isGenerating || !prompt.trim()} className="gap-2">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate Workout
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showWorkout && (
        <Card>
          <CardHeader>
            <CardTitle>HIIT Cardio Blast</CardTitle>
            <CardDescription>
              High-intensity interval training to maximize calorie burn and cardiovascular health
            </CardDescription>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">HIIT</Badge>
              <Badge variant="secondary">Cardio</Badge>
              <Badge variant="secondary">Fat Burning</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-lg font-bold">25 min</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Difficulty</p>
                  <p className="text-lg font-bold">Advanced</p>
                </div>
                <div>
                  <p className="text-sm font-medium">XP Reward</p>
                  <p className="text-lg font-bold text-primary">+200 XP</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Exercises</h3>
                <ul className="space-y-2">
                  <li className="rounded-md border p-3">
                    <div className="font-medium">1. Jumping Jacks</div>
                    <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Sets:</span> 3
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reps:</span> 30 seconds
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rest:</span> 15s
                      </div>
                    </div>
                  </li>
                  <li className="rounded-md border p-3">
                    <div className="font-medium">2. Mountain Climbers</div>
                    <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Sets:</span> 3
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reps:</span> 30 seconds
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rest:</span> 15s
                      </div>
                    </div>
                  </li>
                  <li className="rounded-md border p-3">
                    <div className="font-medium">3. Burpees</div>
                    <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Sets:</span> 3
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reps:</span> 30 seconds
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rest:</span> 15s
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2" onClick={addToRoutine} disabled={addedToRoutine}>
              {addedToRoutine ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Added to Routine!
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add to Daily Routine
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Example prompts for inspiration */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Need inspiration? Try these prompts:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setPrompt('A quick 15-minute HIIT workout I can do at home')}
            >
              Quick 15-min HIIT
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setPrompt('A beginner-friendly strength workout for building muscle')}
            >
              Beginner strength
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setPrompt('A 30-minute core workout to strengthen my abs')}
            >
              30-min core workout
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setPrompt('An advanced 45-minute full body workout')}
            >
              Advanced full body
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
