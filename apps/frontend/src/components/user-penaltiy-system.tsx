import { useState } from 'react';
import { AlertTriangle, ArrowRight, Clock, Skull, X } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@libs/components';

interface PenaltySystemProps {
  onClose: () => void;
}

export const PenaltySystem = ({ onClose }: PenaltySystemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="border-red-500 bg-red-50 dark:bg-red-950/20 animate-pulse">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-red-800 dark:text-red-300">
            <Skull className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
            Penalty Warning
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-red-800 dark:text-red-300">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-red-700 dark:text-red-400">
          You have missed workouts and are at risk of receiving penalties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-md bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <p className="font-medium">You have missed 2 workouts in the past week</p>
              <p className="text-sm mt-1">
                According to the Hunter Association rules, missing 3 workouts in a week will result in severe penalties
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1 text-red-800 dark:text-red-300">
              <span className="font-medium">Penalty Risk</span>
              <span className="font-mono">67%</span>
            </div>
            <div className="h-3 w-full bg-red-200 dark:bg-red-900/50 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 dark:bg-red-500" style={{ width: '67%' }} />
            </div>
          </div>

          {showDetails ? (
            <div className="space-y-3 pt-2">
              <h4 className="font-medium text-red-800 dark:text-red-300">Potential Penalties:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700 mt-0.5"
                  >
                    Minor
                  </Badge>
                  <div className="text-sm text-red-800 dark:text-red-300">
                    <p>Loss of 100 XP and "Muscle Fatigue" debuff (-10% strength) for 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700 mt-0.5"
                  >
                    Moderate
                  </Badge>
                  <div className="text-sm text-red-800 dark:text-red-300">
                    <p>Loss of 250 XP and "Weakened" debuff (-15% to all stats) for 48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700 mt-0.5"
                  >
                    Severe
                  </Badge>
                  <div className="text-sm text-red-800 dark:text-red-300">
                    <p>Loss of 500 XP, level reduction, and "Hunter's Curse" debuff (-25% to all stats) for 72 hours</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 mt-2">
                <Clock className="h-4 w-4" />
                <p className="text-sm">
                  You have <span className="font-bold">5 hours</span> to complete today's workout to avoid penalties
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2 border-red-300 text-red-800 hover:bg-red-200 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/50"
                onClick={() => setShowDetails(false)}
              >
                Hide Details
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-800 hover:bg-red-200 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/50"
              onClick={() => setShowDetails(true)}
            >
              View Potential Penalties <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600" onClick={onClose}>
          I Understand
        </Button>
      </CardFooter>
    </Card>
  );
};
