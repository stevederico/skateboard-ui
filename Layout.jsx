import { Outlet } from 'react-router-dom';
import TabBar from './TabBar.jsx'
import { SidebarProvider, SidebarTrigger } from "./shadcn/ui/sidebar"
import AppSidebar from "./AppSidebar"
import { useEffect } from 'react';
import { getState } from './Context.jsx';

export default function Layout({ children }) {
  const { state } = getState();
  const { sidebarVisible, tabBarVisible } = state.ui;
  const constants = state.constants;

  // Combine constants (static config) with context state (programmatic control)
  const showSidebar = !constants.hideSidebar && sidebarVisible;
  const showTabBar = !constants.hideTabBar && tabBarVisible;

  useEffect(() => {
    const root = document.documentElement;
    let theme;

    // Safely get theme from localStorage
    try {
      theme = localStorage.getItem('theme');
    } catch (error) {
      console.warn('Could not read theme from localStorage:', error.message);
      theme = null;
    }

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (!theme) {
      theme = systemPrefersDark ? 'dark' : 'light';
    }

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Safely save theme to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error.message);
      // Theme will still be applied visually even if not persisted
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col pt-[env(safe-area-inset-top)] pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <SidebarProvider>
        {showSidebar && <AppSidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarProvider>
      {showTabBar && <TabBar className="md:hidden" />}
    </div>
  );
}





