import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { getState } from './core/Context.jsx';
import { ThemeProvider } from 'next-themes';
import Layout from './layout/Layout.jsx';
import LandingView from './views/LandingView.jsx';
import TextView from './views/TextView.jsx';
import SignUpView from './views/SignUpView.jsx';
import SignInView from './views/SignInView.jsx';
import SignOutView from './views/SignOutView.jsx';
import PaymentView from './views/PaymentView.jsx';
import SettingsView from './views/SettingsView.jsx';
import NotFound from './views/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { useAppSetup, initializeUtilities, validateConstants } from './core/Utilities.js';
import { ContextProvider } from './core/Context.jsx';
import { Toaster } from './shadcn/ui/sonner.jsx';
import AuthOverlay from './components/AuthOverlay.jsx';

/**
 * Redirect component for auth routes when authOverlay mode is enabled.
 *
 * Dispatches SHOW_AUTH_OVERLAY on mount and redirects to the previous page
 * (from location state) or /app/home as fallback.
 */
function AuthRedirect() {
  const { dispatch } = getState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: 'SHOW_AUTH_OVERLAY' });
    const returnTo = location.state?.from || '/app/home';
    navigate(returnTo, { replace: true });
  }, [dispatch, navigate, location.state]);

  return null;
}

function App({ constants, appRoutes, defaultRoute, landingPage, overrides = {} }) {
  const location = useLocation();

  useEffect(() => {
    document.title = constants.appName;
  }, [constants.appName]);

  useAppSetup(location);

  const LayoutComponent = overrides.layout || Layout;
  const SettingsComponent = overrides.settings || SettingsView;
  const PaymentComponent = overrides.payment || PaymentView;
  const SignOutComponent = overrides.signOut || SignOutView;
  const NotFoundComponent = overrides.notFound || NotFound;

  // When authOverlay is enabled, redirect /signin and /signup to show the overlay instead
  const SignInComponent = constants.authOverlay
    ? AuthRedirect
    : (overrides.signIn || SignInView);
  const SignUpComponent = constants.authOverlay
    ? AuthRedirect
    : (overrides.signUp || SignUpView);

  return (
    <Routes>
      <Route element={<LayoutComponent />}>
        <Route path="/console" element={<Navigate to="/app" replace />} />
        <Route path="/app" element={<ProtectedRoute />}>
          <Route index element={<Navigate to={defaultRoute} replace />} />
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="settings" element={<SettingsComponent />} />
          <Route path="payment" element={<PaymentComponent />} />
        </Route>
      </Route>
      <Route path="/" element={landingPage || <LandingView />} />
      <Route path="/signin" element={<SignInComponent />} />
      <Route path="/signup" element={<SignUpComponent />} />
      <Route path="/signout" element={<SignOutComponent />} />
      <Route path="/terms" element={<TextView details={constants.termsOfService} />} />
      <Route path="/privacy" element={<TextView details={constants.privacyPolicy} />} />
      <Route path="/eula" element={<TextView details={constants.EULA} />} />
      <Route path="/subs" element={<TextView details={constants.subscriptionDetails} />} />
      <Route path="*" element={<NotFoundComponent />} />
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
 * @param {Object} [config.overrides] - Override built-in view components
 * @param {React.ComponentType} [config.overrides.layout] - Replace Layout
 * @param {React.ComponentType} [config.overrides.settings] - Replace SettingsView
 * @param {React.ComponentType} [config.overrides.payment] - Replace PaymentView
 * @param {React.ComponentType} [config.overrides.signIn] - Replace SignInView
 * @param {React.ComponentType} [config.overrides.signUp] - Replace SignUpView
 * @param {React.ComponentType} [config.overrides.signOut] - Replace SignOutView
 * @param {React.ComponentType} [config.overrides.notFound] - Replace NotFound
 *
 * @example
 * import { createSkateboardApp } from '@stevederico/skateboard-ui/App';
 * import constants from './constants.json';
 *
 * createSkateboardApp({
 *   constants,
 *   appRoutes: [{ path: 'home', element: <HomeView /> }]
 * });
 *
 * @example
 * // Override built-in views
 * createSkateboardApp({
 *   constants,
 *   appRoutes: [{ path: 'home', element: <HomeView /> }],
 *   overrides: {
 *     settings: MySettingsView,
 *     signIn: MySignInView,
 *   }
 * });
 */
export function createSkateboardApp({ constants, appRoutes, defaultRoute = appRoutes[0]?.path || 'home', landingPage, wrapper: Wrapper, overrides }) {
  // Validate constants before initialization
  validateConstants(constants);

  // Initialize utilities with constants
  initializeUtilities(constants);

  // Prevent theme flash by setting dark class before React hydrates
  // This runs synchronously before render, reading from localStorage or system preference
  const storageKey = 'theme';
  const storedTheme = localStorage.getItem(storageKey);
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = storedTheme === 'dark' || (storedTheme !== 'light' && systemDark);
  document.documentElement.classList.toggle('dark', isDark);

  const container = document.getElementById('root');
  const root = createRoot(container);

  root.render(
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-right" richColors closeButton />
        <ContextProvider constants={constants}>
          {Wrapper ? (
            <Wrapper>
              <Router>
                <AuthOverlay />
                <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} landingPage={landingPage} overrides={overrides} />
              </Router>
            </Wrapper>
          ) : (
            <Router>
              <AuthOverlay />
              <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} landingPage={landingPage} overrides={overrides} />
            </Router>
          )}
        </ContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
