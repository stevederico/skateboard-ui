import React, { useState, useEffect } from "react";
import { cn } from "../shadcn/lib/utils.js";

/**
 * Convert a kebab-case, snake_case, or space-separated string to PascalCase.
 *
 * @param {string} str - Input string
 * @returns {string} PascalCase version
 */
function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

let iconsModule = null;
let iconsPromise = null;

/**
 * Lazily load the lucide-react module on first use.
 * Subsequent calls return the cached module immediately.
 *
 * @returns {Promise<Object>} The lucide-react module
 */
function loadIcons() {
  if (iconsModule) return Promise.resolve(iconsModule);
  if (!iconsPromise) {
    iconsPromise = import("lucide-react").then((mod) => {
      iconsModule = mod;
      return mod;
    });
  }
  return iconsPromise;
}

/**
 * Resolve icon name to a Lucide component from the cached module.
 *
 * @param {Object} mod - The lucide-react module
 * @param {string} name - Icon name (kebab-case, snake_case, or PascalCase)
 * @returns {React.ComponentType|null} Icon component or null
 */
function resolveIcon(mod, name) {
  if (!mod) return null;
  const candidates = [
    name,
    toPascalCase(name),
    name.charAt(0).toUpperCase() + name.slice(1),
  ];
  for (const candidate of candidates) {
    if (mod[candidate]) return mod[candidate];
  }
  return null;
}

/**
 * Check if a name string resolves to a valid Lucide icon.
 * Returns false until the icon module has been loaded.
 *
 * @param {string} name - Icon name to check
 * @returns {boolean} True if name resolves to an icon
 */
export function canResolveIcon(name) {
  if (!iconsModule) return false;
  return resolveIcon(iconsModule, name) !== null;
}

/**
 * Render a Lucide icon by name string with lazy loading.
 *
 * Loads lucide-react on first render via dynamic import, then caches the
 * module for all subsequent uses. Shows nothing while loading (typically
 * under 50ms from cache).
 *
 * @param {Object} props
 * @param {string} props.name - Icon name (e.g. "home", "arrow-right", "Settings")
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {string} [props.color='currentColor'] - Icon stroke color
 * @param {number} [props.strokeWidth=2] - Stroke width
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element|null} Rendered icon or null if loading/not found
 *
 * @example
 * import DynamicIcon from '@stevederico/skateboard-ui/DynamicIcon';
 *
 * <DynamicIcon name="home" size={24} />
 * <DynamicIcon name="arrow-right" size={20} color="red" />
 * <DynamicIcon name="settings" className="text-muted-foreground" />
 */
const DynamicIcon = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
  ...props
}) => {
  const [Icon, setIcon] = useState(() => {
    if (iconsModule) return resolveIcon(iconsModule, name);
    return null;
  });

  useEffect(() => {
    if (Icon) return;
    loadIcons().then((mod) => {
      const resolved = resolveIcon(mod, name);
      setIcon(() => resolved);
    });
  }, [name, Icon]);

  if (!Icon) return null;

  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn(className)}
      {...props}
    />
  );
};

export default DynamicIcon;
