import { ThemeProvider } from '@libs/components';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NxWelcome title="frontend" />
    </ThemeProvider>
  );
}

export default App;
