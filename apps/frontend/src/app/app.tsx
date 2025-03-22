import { ThemeProvider } from '@libs/components';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { UserSettingsHotKeyProvider } from './user-settings-provider';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserSettingsHotKeyProvider>
        <RouterProvider router={router} />
      </UserSettingsHotKeyProvider>
    </ThemeProvider>
  );
}

export default App;
