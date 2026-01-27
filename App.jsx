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
import Toast from './Toast.jsx';

function App({ constants, appRoutes, defaultRoute }) {
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
      <Route path="/" element={<LandingView />} />
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

export function createSkateboardApp({ constants, appRoutes, defaultRoute = appRoutes[0]?.path || 'home', wrapper: Wrapper }) {
  // Validate constants before initialization
  validateConstants(constants);

  // Initialize utilities with constants
  initializeUtilities(constants);

  const container = document.getElementById('root');
  const root = createRoot(container);

  root.render(
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toast />
        <ContextProvider constants={constants}>
          {Wrapper ? (
            <Wrapper>
              <Router>
                <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} />
              </Router>
            </Wrapper>
          ) : (
            <Router>
              <App constants={constants} appRoutes={appRoutes} defaultRoute={defaultRoute} />
            </Router>
          )}
        </ContextProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
