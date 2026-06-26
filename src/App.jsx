import { lazy, Suspense, useEffect, useState } from 'react';
import GlobalNavbar from './components/GlobalNavbar.jsx';
import LandingPage from './components/LandingPage.jsx';

const LandingPageV2 = lazy(() => import('./components/LandingPageV2.jsx'));
const EarlyReportIntakePage = lazy(() => import('./components/report-workspace/EarlyReportIntakePage.jsx'));
const ProjectWorkspacePage = lazy(() => import('./components/report-workspace/ProjectWorkspacePage.jsx'));
const InteractiveReportPage = lazy(() => import('./components/interactive-report/InteractiveReportPage.jsx'));
const GuidedStoryReport = lazy(() => import('./components/refractured-report/GuidedStoryReport.jsx'));
const RefracturedAnimationSandbox = lazy(() => import('./components/refractured-report/story-prototype/RefracturedAnimationSandbox.jsx'));

function PageFallback() {
  return <div className="app-loading-shell" aria-live="polite">Loading...</div>;
}

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

  if (hash === '#prototype/landing-v2') {
    return { name: 'landing-v2' };
  }

  return { name: 'landing' };
}

function isPublicDemoRuntime() {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    import.meta.env.VITE_PUBLIC_DEMO === 'true'
    || window.location.hostname.includes('indievaders-demo')
    || window.location.search.includes('demo=true')
    || window.location.hash.includes('demo=true')
  );
}

function App() {
  const publicDemoMode = isPublicDemoRuntime();
  const [route, setRoute] = useState(() => (
    publicDemoMode ? { name: 'client-report' } : getRouteFromHash()
  ));

  useEffect(() => {
    if (publicDemoMode) {
      return undefined;
    }

    const handleHashChange = () => setRoute(getRouteFromHash());

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [publicDemoMode]);

  const showNavbar = !publicDemoMode && ['landing', 'landing-v2', 'sample-report', 'client-report'].includes(route.name);

  const renderPage = () => {
    if (publicDemoMode) {
      return <GuidedStoryReport forceDemoMode />;
    }

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

    if (route.name === 'landing-v2') {
      return <LandingPageV2 />;
    }

    return <LandingPage />;
  };

  return (
    <>
      {showNavbar && <GlobalNavbar />}
      <Suspense fallback={<PageFallback />}>
        {renderPage()}
      </Suspense>
    </>
  );
}

export default App;


