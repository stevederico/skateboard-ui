import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DynamicIcon from './DynamicIcon';
import { getState } from './Context.jsx';

/**
 * Mobile bottom tab bar navigation.
 *
 * Renders page icons from constants.pages plus a settings tab.
 * Only visible on mobile (hidden on md+ screens via Layout).
 *
 * @returns {JSX.Element} Bottom tab bar
 *
 * @example
 * import TabBar from '@stevederico/skateboard-ui/TabBar';
 *
 * // Used internally by Layout component
 * <TabBar />
 */
export default function TabBar() {
  const location = useLocation();
  const { state } = getState();
  const constants = state.constants;

  return (
    <nav
      className="fixed flex md:hidden pt-2 pb-4 bottom-0 inset-x-0 justify-around text-center border-t shadow-lg bg-background"
      role="navigation"
      aria-label="Main navigation"
    >
      {constants?.pages?.map((item) => {
        const isActive = location.pathname.includes(item.url.toLowerCase());
        return (
          <span className="px-3" key={item.title}>
            <Link
              to={`/app/${item.url.toLowerCase()}`}
              className="cursor-pointer"
              aria-label={item.title}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={isActive ? "text-base" : "text-gray-500"}>
                <DynamicIcon name={item.icon} size={32} strokeWidth={1.5} />
              </span>
            </Link>
          </span>
        );
      })}
      <span className="px-3">
        <Link
          to={`/app/settings`}
          className="cursor-pointer"
          aria-label="Settings"
          aria-current={location.pathname.includes('settings') ? 'page' : undefined}
        >
          <span className={location.pathname.includes('settings') ? "text-base" : "text-gray-500"}>
            <DynamicIcon name={"settings"} size={32} strokeWidth={1.5} />
          </span>
        </Link>
      </span>
    </nav>
  );
};
