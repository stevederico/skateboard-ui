import React, { useState, useEffect } from 'react';
import * as LucideIcons from "lucide-react";

const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};

export default function ThemeToggle({ className = "", iconSize = 24, variant = "settings" }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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