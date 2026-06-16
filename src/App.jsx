import { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import EarlyReportIntakePage from './components/report-workspace/EarlyReportIntakePage.jsx';
import ProjectWorkspacePage from './components/report-workspace/ProjectWorkspacePage.jsx';
import InteractiveReportPage from './components/interactive-report/InteractiveReportPage.jsx';

function getRouteFromHash() {
  if (window.location.hash === '#sample-report') {
    return { name: 'sample-report' };
  }

  if (window.location.hash === '#order-report') {
    return { name: 'order-report' };
  }

  if (window.location.hash.startsWith('#workspace/')) {
    return {
      name: 'workspace',
      id: window.location.hash.replace('#workspace/', ''),
    };
  }

  return { name: 'landing' };
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route.name === 'sample-report') {
    return <InteractiveReportPage />;
  }

  if (route.name === 'order-report') {
    return <EarlyReportIntakePage />;
  }

  if (route.name === 'workspace') {
    return <ProjectWorkspacePage requestId={route.id} />;
  }

  return <LandingPage />;
}

export default App;

