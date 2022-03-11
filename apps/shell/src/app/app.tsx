import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TopBar } from '@acme/ui/navigation';

const About = React.lazy(() => import('about/Module'));
const Dashboard = React.lazy(() => import('dashboard/Module'));

export function App() {
  return (
    <>
      <React.Suspense fallback={null}>
        <TopBar
          pages={[
            { text: 'Dashboard', link: '/' },
            { text: 'About', link: '/about' },
          ]}
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
