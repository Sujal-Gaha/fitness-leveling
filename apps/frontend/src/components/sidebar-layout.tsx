import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Progress,
} from '@libs/components';
import {
  Award,
  Brain,
  Dumbbell,
  LayoutDashboard,
  ListChecks,
  LucideProps,
  Menu,
  Settings,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import { ForwardRefExoticComponent, ReactNode, RefAttributes, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { _FULL_ROUTES } from '../app/route';
import { useUserSettingsModalStore } from '../stores/useUserSettingsModalStore';

type NavItem = {
  id: number;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  url: string;
  isEnabled: boolean;
};

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { openUserSettingsModal } = useUserSettingsModalStore();

  const openSidebar = () => setSidebarOpen(true);
  // const closeSidebar = () => setSidebarOpen(false);

  const location = useLocation();

  const navItems: NavItem[] = [
    {
      id: 1,
      label: 'Dashboard',
      icon: LayoutDashboard,
      url: _FULL_ROUTES.HOME,
      isEnabled: true,
    },
    {
      id: 2,
      label: 'Workouts',
      icon: Dumbbell,
      url: '/workouts',
      isEnabled: false,
    },
    {
      id: 3,
      label: 'AI Generator',
      icon: Brain,
      url: _FULL_ROUTES.AI_GENERATOR,
      isEnabled: true,
    },
    {
      id: 4,
      label: 'Daily Routine',
      icon: ListChecks,
      url: _FULL_ROUTES.DAILY_ROUTINE,
      isEnabled: true,
    },
    {
      id: 5,
      label: 'Achievements',
      icon: Trophy,
      url: _FULL_ROUTES.ACHIEVEMENTS,
      isEnabled: true,
    },
  ];

  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
  };

  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-center gap-2 border-b px-4">
          <Zap className="h-6 w-6 text-primary" />
          <Link to="/" className="flex items-center gap-2">
            <span
              className={cn(
                'font-bold text-xl transition-opacity',
                isSidebarOpen ? 'opacity-100' : 'opacity-0 md:hidden'
              )}
            >
              Fitness Leveling
            </span>
          </Link>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              if (!item.isEnabled) return null;
              return (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className={cn(
                      'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                      location.pathname === item.url ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <item.icon className={cn('h-5 w-5 mr-3', isSidebarOpen ? '' : 'mx-auto')} />
                    <span
                      className={cn(
                        'transition-opacity',
                        isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block md:opacity-0'
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <div className={cn('rounded-lg bg-muted p-3', isSidebarOpen ? '' : 'flex justify-center')}>
            <div className={cn('flex items-center gap-3', isSidebarOpen ? '' : 'flex-col')}>
              <Award className="h-5 w-5 text-primary" />
              <div className={cn(isSidebarOpen ? '' : 'hidden md:hidden')}>
                <div className="text-sm font-medium">Level {user.level}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {user.xp}/{user.xpToNextLevel} XP
                </div>
                <Progress value={xpPercentage} className="h-1 mt-1" />
              </div>
            </div>
          </div>
          <ul className="mt-2">
            <li>
              <button
                className={
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted text-muted-foreground w-full'
                }
                onClick={openUserSettingsModal}
              >
                <Settings className={cn('h-5 w-5 mr-3', isSidebarOpen ? '' : 'mx-auto')} />
                <span
                  className={cn(
                    'transition-opacity',
                    isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block md:opacity-0'
                  )}
                >
                  Settings
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:px-6">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={openSidebar}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openUserSettingsModal}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};
