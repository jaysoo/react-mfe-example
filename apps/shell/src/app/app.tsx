import * as React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const About = React.lazy(() => import('about/Module'));
const Dashboard = React.lazy(() => import('dashboard/Module'));

export function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="dashboard"
          element={
            <React.Suspense fallback={null}>
              <Dashboard />
            </React.Suspense>
          }
        />
        <Route
          path="about"
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
