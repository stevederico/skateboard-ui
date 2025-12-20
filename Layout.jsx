import { Outlet } from 'react-router-dom';
import TabBar from './TabBar.jsx'
import { SidebarProvider, SidebarTrigger } from "./shadcn/ui/sidebar"
import AppSidebar from "./AppSidebar"
import { useEffect } from 'react';
import constants from "@/constants.json";

export default function Layout({ children }) {

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
    <div className="min-h-screen flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <SidebarProvider>
        {!constants.hideSidebar && <AppSidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarProvider>
      <TabBar className="md:hidden" />
    </div>
  );
}





