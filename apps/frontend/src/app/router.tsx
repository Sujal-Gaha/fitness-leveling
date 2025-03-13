import { createBrowserRouter } from 'react-router-dom';
import { SidebarLayout } from '../components/sidebar-layout';
import { DashboardPage } from '../pages/dashboard.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SidebarLayout>
        <DashboardPage />
      </SidebarLayout>
    ),
  },
  {
    path: '/ai-generator',
    element: (
      <SidebarLayout>
        <div>Ai Generator</div>
      </SidebarLayout>
    ),
  },
]);
