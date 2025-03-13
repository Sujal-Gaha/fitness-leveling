import { Dumbbell } from 'lucide-react';
import { UserNav } from './user-nav';
import { Link } from 'react-router-dom';

export function UserNavbar() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6 w-full">
      <div className="flex items-center space-x-2">
        <Dumbbell className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">Fitness Leveling</span>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Link to="/settings" className="text-sm font-medium transition-colors hover:text-primary">
          Settings
        </Link>
        <Link to="/help" className="text-sm font-medium transition-colors hover:text-primary">
          Help
        </Link>
        <UserNav />
      </div>
    </div>
  );
}
