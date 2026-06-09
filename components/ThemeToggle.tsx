import React from 'react';
import { useTheme } from './core/ThemeProvider.js';
import { Sun, Moon } from '../icons/index.js';
import { Button } from '../shadcn/ui/button.js';
import { cn } from '../shadcn/lib/utils.js';

/**
 * Dark/light mode toggle button.
 *
 * Renders a sun/moon icon that toggles the theme via the local ThemeProvider.
 * Supports two visual variants: "settings" (ghost) and "landing" (outline).
 *
 * @param {Object} props
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {number} [props.iconSize=16] - Icon size in pixels
 * @param {string} [props.variant="settings"] - Visual style ("settings" | "landing")
 * @returns {JSX.Element|null} Toggle button or null before mount
 *
 * @example
 * import ThemeToggle from '@stevederico/skateboard-ui/ThemeToggle';
 *
 * <ThemeToggle />
 * <ThemeToggle variant="landing" iconSize={18} />
 */
export interface ThemeToggleProps {
  className?: string;
  iconSize?: number;
  variant?: 'settings' | 'landing';
  [key: string]: any;
}

export default function ThemeToggle({ className = "", iconSize = 16, variant = "settings", ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';
  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');

  return (
    <Button
      variant={variant === "landing" ? "outline" : "ghost"}
      size="icon"
      onClick={toggleTheme}
      className={cn(className)}
      aria-label="Toggle dark mode"
      {...props}
    >
      {isDarkMode
        ? <Sun size={iconSize} />
        : <Moon size={iconSize} />
      }
    </Button>
  );
}
