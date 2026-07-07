import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router';
import { useEffect } from 'react';
import { getState } from './components/core/Context.js';
import { ThemeProvider } from './components/core/ThemeProvider.js';
import Layout from './components/layout/Layout.js';
import LandingView from './components/views/LandingView.js';
import TextView from './components/views/TextView.js';
import SignUpView from './components/views/SignUpView.js';
import SignInView from './components/views/SignInView.js';
import SignOutView from './components/views/SignOutView.js';
import PaymentView from './components/views/PaymentView.js';
import SettingsView from './components/views/SettingsView.js';
import NotFound from './components/views/NotFound.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import { useAppSetup, initializeUtilities, validateConstants, isAuthOverlayEnabled, isAuthenticated } from './components/core/Utilities.js';
import { ContextProvider } from './components/core/Context.js';
import AuthOverlay from './components/AuthOverlay.js';
import type { ComponentType, ReactNode } from 'react';
import type { SkateboardConstants } from './components/core/Utilities.js';

/** A route rendered under /app (config.appRoutes). */
export interface AppRoute {
  path: string;
  element: ReactNode;
}

/** Built-in view components that can be replaced via config.overrides. */
export interface AppOverrides {
  layout?: ComponentType<any>;
  settings?: ComponentType<any>;
  payment?: ComponentType<any>;
  signIn?: ComponentType<any>;
  signUp?: ComponentType<any>;
  signOut?: ComponentType<any>;
  notFound?: ComponentType<any>;
  authOverlay?: ComponentType<any>;
}

/** Configuration accepted by createSkateboardApp. */
export interface CreateSkateboardAppConfig {
  constants: SkateboardConstants;
  appRoutes: AppRoute[];
  defaultRoute?: string;
  landingPage?: ReactNode;
  wrapper?: ComponentType<{ children?: ReactNode }>;
  overrides?: AppOverrides;
}

/**
 * Redirect component for auth routes when authOverlay mode is enabled.
 *
 * Dispatches SHOW_AUTH_OVERLAY on mount and redirects to the previous page
 * (from location state) or /app as fallback (which routes to the app's defaultRoute).
 */
function AuthRedirect() {
  const { dispatch } = getState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Already authenticated (e.g. reached /signin via a stale link)? Skip the
    // overlay — just send them into the app instead of prompting a signed-in user.
    if (!isAuthenticated()) {
      dispatch({ type: 'SHOW_AUTH_OVERLAY' });
    }
    const returnTo = location.state?.from || '/app';
    navigate(returnTo, { replace: true });
  }, [dispatch, navigate, location.state]);

  return null;
}

function App({ constants, appRoutes, defaultRoute, landingPage, overrides = {} }: {
  constants: SkateboardConstants;
  appRoutes: AppRoute[];
  defaultRoute: string;
  landingPage?: ReactNode;
  overrides?: AppOverrides;
}) {
  const location = useLocation();

  // document.title is set by useAppSetup (on navigation) — single source of truth.
  useAppSetup(location);

  const LayoutComponent = overrides.layout || Layout;
  const SettingsComponent = overrides.settings || SettingsView;
  const PaymentComponent = overrides.payment || PaymentView;
  const SignOutComponent = overrides.signOut || SignOutView;
  const NotFoundComponent = overrides.notFound || NotFound;

  // authOverlay is on by default (except noLogin apps); redirect /signin and
  // /signup to show the overlay unless explicitly disabled with authOverlay:false.
  // An explicit override always wins, so consumers can supply custom auth pages.
  const SignInComponent = overrides.signIn || (isAuthOverlayEnabled() ? AuthRedirect : SignInView);
  const SignUpComponent = overrides.signUp || (isAuthOverlayEnabled() ? AuthRedirect : SignUpView);

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
      <Route path="/terms" element={<TextView details={constants.termsOfService!} />} />
      <Route path="/privacy" element={<TextView details={constants.privacyPolicy!} />} />
      <Route path="/eula" element={<TextView details={constants.EULA!} />} />
      <Route path="/subs" element={<TextView details={constants.subscriptionDetails!} />} />
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
 * @param {React.ComponentType} [config.overrides.authOverlay] - Replace AuthOverlay
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
export function createSkateboardApp({ constants, appRoutes, defaultRoute = appRoutes[0]?.path || 'home', landingPage, wrapper: Wrapper, overrides }: CreateSkateboardAppConfig) {
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
  const root = createRoot(container!);
  const AuthOverlayComponent = overrides?.authOverlay || AuthOverlay;

  root.render(
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ContextProvider constants={constants}>
          {Wrapper ? (
            <Wrapper>
              <Router>
                <AuthOverlayComponent />
                <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} landingPage={landingPage} overrides={overrides} />
              </Router>
            </Wrapper>
          ) : (
            <Router>
              <AuthOverlayComponent />
              <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} landingPage={landingPage} overrides={overrides} />
            </Router>
          )}
        </ContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
