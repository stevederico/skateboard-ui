import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Layout from './Layout.jsx';
import LandingView from './LandingView.jsx';
import TextView from './TextView.jsx';
import SignUpView from './SignUpView.jsx';
import SignInView from './SignInView.jsx';
import SignOutView from './SignOutView.jsx';
import PaymentView from './PaymentView.jsx';
import SettingsView from './SettingsView.jsx';
import NotFound from './NotFound.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { useAppSetup, initializeUtilities, validateConstants } from './Utilities.js';
import { ContextProvider } from './Context.jsx';
import { Toaster } from './shadcn/ui/sonner.jsx';
import AuthOverlay from './AuthOverlay.jsx';

function App({ constants, appRoutes, defaultRoute, landingPage }) {
  const location = useLocation();

  useEffect(() => {
    document.title = constants.appName;
  }, [constants.appName]);

  useAppSetup(location);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/console" element={<Navigate to="/app" replace />} />
        <Route path="/app" element={<ProtectedRoute />}>
          <Route index element={<Navigate to={defaultRoute} replace />} />
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="settings" element={<SettingsView />} />
          <Route path="payment" element={<PaymentView />} />
        </Route>
      </Route>
      <Route path="/" element={landingPage || <LandingView />} />
      <Route path="/signin" element={<SignInView />} />
      <Route path="/signup" element={<SignUpView />} />
      <Route path="/signout" element={<SignOutView />} />
      <Route path="/terms" element={<TextView details={constants.termsOfService} />} />
      <Route path="/privacy" element={<TextView details={constants.privacyPolicy} />} />
      <Route path="/eula" element={<TextView details={constants.EULA} />} />
      <Route path="/subs" element={<TextView details={constants.subscriptionDetails} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/**
 * Bootstrap and render a skateboard-ui application.
 *
 * Sets up routing, authentication, layout, theming, and toast notifications.
 * Mounts the app to the #root DOM element.
 *
 * @param {Object} config
 * @param {Object} config.constants - App constants (see README for required fields)
 * @param {Array<{path: string, element: JSX.Element}>} config.appRoutes - Routes rendered under /app
 * @param {string} [config.defaultRoute] - Default route path under /app (defaults to first route)
 * @param {JSX.Element} [config.landingPage] - Custom landing page for "/". Defaults to LandingView.
 * @param {React.ComponentType} [config.wrapper] - Optional wrapper component around the router
 *
 * @example
 * import { createSkateboardApp } from '@stevederico/skateboard-ui/App';
 * import constants from './constants.json';
 *
 * createSkateboardApp({
 *   constants,
 *   appRoutes: [{ path: 'home', element: <HomeView /> }]
 * });
 */
export function createSkateboardApp({ constants, appRoutes, defaultRoute = appRoutes[0]?.path || 'home', landingPage, wrapper: Wrapper }) {
  // Validate constants before initialization
  validateConstants(constants);

  // Initialize utilities with constants
  initializeUtilities(constants);

  const container = document.getElementById('root');
  const root = createRoot(container);

  root.render(
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-right" richColors closeButton />
        <ContextProvider constants={constants}>
          <AuthOverlay />
          {Wrapper ? (
            <Wrapper>
              <Router>
                <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} landingPage={landingPage} />
              </Router>
            </Wrapper>
          ) : (
            <Router>
              <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} landingPage={landingPage} />
            </Router>
          )}
        </ContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
