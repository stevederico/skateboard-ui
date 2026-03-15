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

/** Cache of resolved icon components keyed by name */
const iconCache = new Map();

/** Cache of in-flight import promises keyed by module name */
const importCache = new Map();

/**
 * Load a single Tabler icon by its PascalCase name (e.g. "IconLock").
 * Each icon is imported individually (~1KB) instead of loading the entire
 * icon library (~400KB). Results are cached for instant subsequent lookups.
 *
 * @param {string} iconName - PascalCase icon name with "Icon" prefix
 * @returns {Promise<React.ComponentType|null>} Icon component or null
 */
function loadIcon(iconName) {
  if (iconCache.has(iconName)) return Promise.resolve(iconCache.get(iconName));
  if (importCache.has(iconName)) return importCache.get(iconName);

  const promise = import(`@tabler/icons-react/dist/esm/icons/${iconName}.mjs`)
    .then((mod) => {
      const Icon = mod.default || mod[iconName] || null;
      iconCache.set(iconName, Icon);
      importCache.delete(iconName);
      return Icon;
    })
    .catch(() => {
      iconCache.set(iconName, null);
      importCache.delete(iconName);
      return null;
    });

  importCache.set(iconName, promise);
  return promise;
}

/**
 * Resolve a kebab-case icon name to a Tabler PascalCase module name.
 * e.g. "layout-dashboard" → "IconLayoutDashboard"
 *
 * @param {string} name - Icon name in any case format
 * @returns {string} Tabler PascalCase name with "Icon" prefix
 */
function toTablerName(name) {
  if (name.startsWith("Icon")) return name;
  return "Icon" + toPascalCase(name);
}

/**
 * Check if a name string has been resolved to a valid icon.
 * Returns false for unloaded or invalid icons.
 *
 * @param {string} name - Icon name to check
 * @returns {boolean} True if icon is cached and valid
 */
export function canResolveIcon(name) {
  const tablerName = toTablerName(name);
  return iconCache.has(tablerName) && iconCache.get(tablerName) !== null;
}

/**
 * Render a Tabler icon by name string with per-icon lazy loading.
 *
 * Each icon is imported individually from @tabler/icons-react (~1KB per icon)
 * instead of loading the entire library. Resolved icons are cached in memory
 * for instant rendering on subsequent uses.
 *
 * Accepts kebab-case ("layout-dashboard"), PascalCase ("LayoutDashboard"),
 * or prefixed ("IconLayoutDashboard") names.
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
  const tablerName = toTablerName(name);

  const [Icon, setIcon] = useState(() => iconCache.get(tablerName) || null);

  useEffect(() => {
    if (Icon) return;
    loadIcon(tablerName).then((resolved) => {
      if (resolved) setIcon(() => resolved);
    });
  }, [tablerName, Icon]);

  if (!Icon) return null;

  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
};

export default DynamicIcon;
