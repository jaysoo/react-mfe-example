import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TopBar } from '@acme/ui/navigation';

const About = React.lazy(() => import('about/Module'));
const Dashboard = React.lazy(() => import('dashboard/Module'));

export function App() {
  return (
    <>
      <TopBar
        pages={[
          { text: 'Dashboard', link: '/' },
          { text: 'About', link: '/about' },
        ]}
      />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={null}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <React.Suspense fallback={null}>
              <About />
            </React.Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
