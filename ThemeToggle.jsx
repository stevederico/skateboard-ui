import React from 'react';
import { useTheme } from 'next-themes';
import DynamicIcon from './DynamicIcon.jsx';
import { Button } from './shadcn/ui/button.jsx';
import { cn } from './shadcn/lib/utils.js';

/**
 * Dark/light mode toggle button.
 *
 * Renders a sun/moon icon that toggles the theme via next-themes.
 * Supports two visual variants: "settings" (minimal) and "landing" (boxed).
 *
 * @param {Object} props
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {number} [props.iconSize=24] - Icon size in pixels
 * @param {string} [props.variant="settings"] - Visual style ("settings" | "landing")
 * @returns {JSX.Element|null} Toggle button or null before mount
 *
 * @example
 * import ThemeToggle from '@stevederico/skateboard-ui/ThemeToggle';
 *
 * <ThemeToggle />
 * <ThemeToggle variant="landing" iconSize={18} />
 */
export default function ThemeToggle({ className = "", iconSize = 24, variant = "settings", ...props }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark';
  const toggleTheme = () => setTheme(isDarkMode ? 'light' : 'dark');

  if (variant === "landing") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className={cn("cursor-pointer", className)}
        aria-label="Toggle dark mode"
        {...props}
      >
        <DynamicIcon
          name={isDarkMode ? "sun" : "moon"}
          size={iconSize}
          color="currentColor"
          strokeWidth={2}
        />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("cursor-pointer text-muted-foreground", className)}
      aria-label="Toggle dark mode"
      {...props}
    >
      <DynamicIcon name={isDarkMode ? "sun" : "moon"} size={iconSize} />
    </Button>
  );
}
