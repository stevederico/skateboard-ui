import React from 'react';
import { useTheme } from 'next-themes';
import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};

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
export default function ThemeToggle({ className = "", iconSize = 24, variant = "settings" }) {
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
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer ${className}`}
        aria-label="Toggle dark mode"
      >
        <DynamicIcon
          name={isDarkMode ? "sun" : "moon"}
          size={iconSize}
          color="currentColor"
          strokeWidth={2}
          className="text-gray-600 dark:text-gray-300"
        />
      </button>
    );
  }

  return (
    <button onClick={toggleTheme} className={`cursor-pointer ${className}`}>
      {isDarkMode ? (
        <span className="text-gray-500">
          <DynamicIcon name="sun" size={iconSize} />
        </span>
      ) : (
        <span className="text-gray-500">
          <DynamicIcon name="moon" size={iconSize} />
        </span>
      )}
    </button>
  );
}
