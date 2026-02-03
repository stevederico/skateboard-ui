import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DynamicIcon from './DynamicIcon';
import { getState } from './Context.jsx';
import { cn } from './shadcn/lib/utils.js';

/**
 * Mobile bottom tab bar navigation.
 *
 * Renders page icons from constants.pages plus a settings tab.
 * Only visible on mobile (hidden on md+ screens via Layout).
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Bottom tab bar
 *
 * @example
 * import TabBar from '@stevederico/skateboard-ui/TabBar';
 *
 * // Used internally by Layout component
 * <TabBar />
 */
export default function TabBar({ className, ...props }) {
  const location = useLocation();
  const { state } = getState();
  const constants = state.constants;

  return (
    <nav
      className={cn(
        "fixed flex md:hidden pt-2 pb-4 bottom-0 inset-x-0 justify-around text-center border-t shadow-lg bg-background",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      {constants?.pages?.map((item) => {
        const isActive = location.pathname.includes(item.url.toLowerCase());
        return (
          <Link
            key={item.title}
            to={`/app/${item.url.toLowerCase()}`}
            className={cn(
              "flex flex-col items-center px-3 cursor-pointer transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
            aria-label={item.title}
            aria-current={isActive ? 'page' : undefined}
          >
            <DynamicIcon name={item.icon} size={32} strokeWidth={1.5} />
          </Link>
        );
      })}
      <Link
        to="/app/settings"
        className={cn(
          "flex flex-col items-center px-3 cursor-pointer transition-colors",
          location.pathname.includes('settings') ? "text-foreground" : "text-muted-foreground"
        )}
        aria-label="Settings"
        aria-current={location.pathname.includes('settings') ? 'page' : undefined}
      >
        <DynamicIcon name="settings" size={32} strokeWidth={1.5} />
      </Link>
    </nav>
  );
}
