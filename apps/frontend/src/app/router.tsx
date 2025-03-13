import { createBrowserRouter } from 'react-router-dom';
import { SidebarLayout } from '../components/sidebar-layout';
import { DashboardPage } from '../pages/dashboard.page';
import { _FULL_ROUTES } from './route';
import { AIGeneratorPage } from '../pages/ai-generator.page';

export const router = createBrowserRouter([
  {
    path: _FULL_ROUTES.HOME,
    element: (
      <SidebarLayout>
        <DashboardPage />
      </SidebarLayout>
    ),
  },
  {
    path: _FULL_ROUTES.AI_GENERATOR,
    element: (
      <SidebarLayout>
        <AIGeneratorPage />
      </SidebarLayout>
    ),
  },
]);
