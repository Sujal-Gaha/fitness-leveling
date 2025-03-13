import { createBrowserRouter, Outlet } from 'react-router-dom';
import { SidebarLayout } from '../components/sidebar-layout';
import { DashboardPage } from '../pages/dashboard.page';
import { _FULL_ROUTES } from './route';
import { AIGeneratorPage } from '../pages/ai-generator.page';

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
    ],
  },
]);
