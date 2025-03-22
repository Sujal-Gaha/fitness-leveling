import { createBrowserRouter, Outlet, RouteObject } from 'react-router-dom';
import { SidebarLayout } from '../components/sidebar-layout';
import { DashboardPage } from '../pages/dashboard.page';
import { _FULL_ROUTES } from './route';
import { AIGeneratorPage } from '../pages/ai-generator.page';
import { AchievementsPage } from '../pages/achievements.page';
import { DailyRoutinePage } from '../pages/daily-routine.page';
import { LoginPage } from '../pages/user/auth/login.page';
import { RegisterPage } from '../pages/user/auth/register.page';

const authRoutes: RouteObject[] = [
  {
    path: _FULL_ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: _FULL_ROUTES.REGISTER,
    element: <RegisterPage />,
  },
];

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
  ...authRoutes,
]);
