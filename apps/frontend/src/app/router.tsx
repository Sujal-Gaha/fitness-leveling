import { createBrowserRouter, Outlet } from 'react-router-dom';
import { SidebarLayout } from '../components/sidebar-layout';
import { DashboardPage } from '../pages/dashboard.page';
import { _FULL_ROUTES } from './route';
import { AIGeneratorPage } from '../pages/ai-generator.page';
import { AchievementsPage } from '../pages/achievements.page';
import { DailyRoutinePage } from '../pages/daily-routine.page';

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    ),
    children: [
      {
        path: _FULL_ROUTES.HOME,
        element: <DashboardPage />,
      },
      {
        path: _FULL_ROUTES.AI_GENERATOR,
        element: <AIGeneratorPage />,
      },
      {
        path: _FULL_ROUTES.ACHIEVEMENTS,
        element: <AchievementsPage />,
      },
      {
        path: _FULL_ROUTES.DAILY_ROUTINE,
        element: <DailyRoutinePage />,
      },
    ],
  },
]);
