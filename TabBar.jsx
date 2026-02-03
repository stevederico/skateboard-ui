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

  const tabs = [
    ...(constants?.pages || []).map((item) => ({
      title: item.title,
      icon: item.icon,
      to: `/app/${item.url.toLowerCase()}`,
      match: item.url.toLowerCase(),
    })),
    { title: 'Settings', icon: 'settings', to: '/app/settings', match: 'settings' },
  ];

  return (
    <nav
      className={cn(
        "fixed md:hidden bottom-0 inset-x-0 bg-background border-t border-border z-50",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      <div className="flex justify-around items-center pt-2 pb-4">
        {tabs.map((tab) => {
          const isActive = location.pathname.includes(tab.match);
          return (
            <Link
              key={tab.title}
              to={tab.to}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-label={tab.title}
              aria-current={isActive ? 'page' : undefined}
            >
              <DynamicIcon name={tab.icon} size={24} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-xs">{tab.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
