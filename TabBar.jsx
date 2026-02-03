import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DynamicIcon from './DynamicIcon';
import { getState } from './Context.jsx';
import { Separator } from './shadcn/ui/separator.jsx';
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
        "fixed md:hidden bottom-0 inset-x-0 bg-background border-t z-50",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      <div className="flex justify-around items-center pt-2 pb-4">
        {constants?.pages?.map((item) => {
          const isActive = location.pathname.includes(item.url.toLowerCase());
          return (
            <Link
              key={item.title}
              to={`/app/${item.url.toLowerCase()}`}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-label={item.title}
              aria-current={isActive ? 'page' : undefined}
            >
              <DynamicIcon name={item.icon} size={24} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">{item.title}</span>
            </Link>
          );
        })}
        {(() => {
          const isActive = location.pathname.includes('settings');
          return (
            <Link
              to="/app/settings"
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-label="Settings"
              aria-current={isActive ? 'page' : undefined}
            >
              <DynamicIcon name="settings" size={24} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px]">Settings</span>
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}
