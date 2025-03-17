import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, cn, ScrollArea } from '@libs/components';
import { CheckCircle, Clock, Skull } from 'lucide-react';
import { Penalty, PenaltySystem } from '../utils/Penalty';

interface PenaltyHistoryProps {
  penalties: Penalty[];
}

export const PenaltyHistory = ({ penalties }: PenaltyHistoryProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const penaltySystem = new PenaltySystem(penalties);
  const getSeverityColor = penaltySystem.getSeverityColor;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Skull className="h-5 w-5 mr-2 text-red-500" />
          Penalty History
        </CardTitle>
        <CardDescription>Record of penalties received for missed or incomplete workouts</CardDescription>
      </CardHeader>
      <CardContent>
        {penalties.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500 opacity-50" />
            <p>No penalties received yet. Keep up the good work!</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {penalties.map((penalty) => (
                <Card key={penalty.id} className={cn('overflow-hidden', penalty.resolved ? 'opacity-70' : '')}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{penalty.description}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          {formatDate(penalty.date)}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={cn(getSeverityColor(penalty.severity))}>
                        {penalty.severity.charAt(0).toUpperCase() + penalty.severity.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="text-sm">
                      <p className="font-medium mb-1">Consequence:</p>
                      <p className="text-muted-foreground">{penalty.consequence}</p>
                    </div>

                    {penalty.resolved && (
                      <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Penalty has been resolved
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
