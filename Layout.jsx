import { Outlet } from 'react-router-dom';
import TabBar from './TabBar.jsx'
import { SidebarProvider, SidebarInset } from "./shadcn/ui/sidebar"
import Sidebar from "./Sidebar"
import { getState } from './Context.jsx';

/**
 * Page layout wrapper with sidebar and tab bar.
 *
 * Renders Sidebar (desktop) and TabBar (mobile) based on constants
 * configuration and programmatic visibility state. Uses SidebarInset
 * for proper shadcn sidebar layout with inset variant.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Child content (unused, Outlet renders routes)
 * @returns {JSX.Element} Layout with sidebar, main content, and tab bar
 *
 * @example
 * import Layout from '@stevederico/skateboard-ui/Layout';
 *
 * // Used internally by createSkateboardApp route config
 * <Route element={<Layout />}>
 *   <Route path="home" element={<HomeView />} />
 * </Route>
 */
export default function Layout({ children }) {
  const { state } = getState();
  const { sidebarVisible, tabBarVisible } = state.ui;
  const constants = state.constants;

  // Combine constants (static config) with context state (programmatic control)
  const showSidebar = !constants.hideSidebar && sidebarVisible;
  const showTabBar = !constants.hideTabBar && tabBarVisible;

  return (
    <div className="min-h-screen flex flex-col pt-[env(safe-area-inset-top)] pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <SidebarProvider style={{
        '--sidebar-width': 'calc(var(--spacing) * 72)',
        '--header-height': '3.5rem',
      }}>
        {showSidebar && <Sidebar variant="inset" />}
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
      {showTabBar && <TabBar className="md:hidden" />}
    </div>
  );
}
