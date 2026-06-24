import { useEffect, useState } from 'react';
import GlobalNavbar from './components/GlobalNavbar.jsx';
import LandingPage from './components/LandingPage.jsx';
import EarlyReportIntakePage from './components/report-workspace/EarlyReportIntakePage.jsx';
import ProjectWorkspacePage from './components/report-workspace/ProjectWorkspacePage.jsx';
import InteractiveReportPage from './components/interactive-report/InteractiveReportPage.jsx';
import GuidedStoryReport from './components/refractured-report/GuidedStoryReport.jsx';
import RefracturedAnimationSandbox from './components/refractured-report/story-prototype/RefracturedAnimationSandbox.jsx';

function getRouteFromHash() {
  const hash = window.location.hash.split('?')[0];

  if (hash === '#sample-report') {
    return { name: 'sample-report' };
  }

  if (hash === '#order-report') {
    return { name: 'order-report' };
  }

  if (hash.startsWith('#workspace/')) {
    return {
      name: 'workspace',
      id: hash.replace('#workspace/', ''),
    };
  }

  if (hash === '#client-report/refractured') {
    return { name: 'client-report' };
  }

  if (hash === '#prototype/refractured-flow') {
    window.history.replaceState(null, '', '#client-report/refractured');
    return { name: 'client-report' };
  }

  if (hash === '#prototype/animation-sandbox') {
    return { name: 'animation-sandbox' };
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

  const showNavbar = ['landing', 'sample-report', 'client-report'].includes(route.name);

  const renderPage = () => {
    if (route.name === 'sample-report') {
      return <InteractiveReportPage />;
    }

    if (route.name === 'order-report') {
      return <EarlyReportIntakePage />;
    }

    if (route.name === 'workspace') {
      return <ProjectWorkspacePage key={route.id} requestId={route.id} />;
    }

    if (route.name === 'client-report') {
      return <GuidedStoryReport />;
    }

    if (route.name === 'animation-sandbox') {
      return <RefracturedAnimationSandbox />;
    }

    return <LandingPage />;
  };

  return (
    <>
      {showNavbar && <GlobalNavbar />}
      {renderPage()}
    </>
  );
}

export default App;


