import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Footer } from './components/footer.tsx';
import { SplineBackground } from './components/spline-background.tsx';

// Get the root element and ensure it's not null
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="flex min-h-screen flex-col">

            <SplineBackground />
            <div className="flex-1 relative z-10"><App /></div>
            <Footer />
          </div>
    </ThemeProvider>
  </StrictMode>
);
