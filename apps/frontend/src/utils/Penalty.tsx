export type Penalty = {
  id: number;
  date: Date;
  description: string;
  severity: 'minor' | 'moderate' | 'severe';
  consequence: string;
  resolved: boolean;
};

export class PenaltySystem {
  private penalties: Penalty[] = [];

  constructor(penalties: Penalty[]) {
    this.penalties = penalties;
  }

  getSeverityColor = (severity: 'minor' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'minor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      case 'moderate':
        return 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };
}
