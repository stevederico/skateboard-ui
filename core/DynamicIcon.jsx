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

/**
 * Convert a PascalCase or camelCase string to kebab-case.
 *
 * @param {string} str - Input string
 * @returns {string} kebab-case version
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/** Cache of resolved icon components keyed by name */
const iconCache = new Map();

/** Cache of in-flight import promises keyed by module name */
const importCache = new Map();

/**
 * Load a single Lucide icon by its kebab-case file name (e.g. "arrow-right").
 * Each icon is imported individually (~1KB) instead of loading the entire
 * icon library. Results are cached for instant subsequent lookups.
 *
 * @param {string} kebabName - kebab-case icon file name
 * @param {string} cacheKey - PascalCase name used as cache key
 * @returns {Promise<React.ComponentType|null>} Icon component or null
 */
function loadIcon(kebabName, cacheKey) {
  if (iconCache.has(cacheKey)) return Promise.resolve(iconCache.get(cacheKey));
  if (importCache.has(cacheKey)) return importCache.get(cacheKey);

  const promise = import(`/node_modules/lucide-react/dist/esm/icons/${kebabName}.js`)
    .then((mod) => {
      const Icon = mod.default || null;
      iconCache.set(cacheKey, Icon);
      importCache.delete(cacheKey);
      return Icon;
    })
    .catch(() => {
      iconCache.set(cacheKey, null);
      importCache.delete(cacheKey);
      return null;
    });

  importCache.set(cacheKey, promise);
  return promise;
}

/**
 * Resolve an icon name in any format to a PascalCase name and kebab-case file path.
 * e.g. "layout-dashboard" → { pascal: "LayoutDashboard", kebab: "layout-dashboard" }
 *      "LayoutDashboard"  → { pascal: "LayoutDashboard", kebab: "layout-dashboard" }
 *
 * Strips legacy "Icon" prefix from Tabler-style names for backwards compatibility.
 *
 * @param {string} name - Icon name in any case format
 * @returns {{ pascal: string, kebab: string }} Resolved icon name pair
 */
function toIconName(name) {
  let stripped = name;
  if (stripped.startsWith("Icon") && stripped.length > 4 && stripped[4] === stripped[4].toUpperCase()) {
    stripped = stripped.slice(4);
  }
  const pascal = /[-_\s]/.test(stripped) ? toPascalCase(stripped) : stripped;
  const kebab = toKebabCase(pascal);
  return { pascal, kebab };
}

/**
 * Check if a name string has been resolved to a valid icon.
 * Returns false for unloaded or invalid icons.
 *
 * @param {string} name - Icon name to check
 * @returns {boolean} True if icon is cached and valid
 */
export function canResolveIcon(name) {
  const { pascal } = toIconName(name);
  return iconCache.has(pascal) && iconCache.get(pascal) !== null;
}

/**
 * Render a Lucide icon by name string with per-icon lazy loading.
 *
 * Each icon is imported individually from lucide-react (~1KB per icon)
 * instead of loading the entire library. Resolved icons are cached in memory
 * for instant rendering on subsequent uses.
 *
 * Accepts kebab-case ("layout-dashboard"), PascalCase ("LayoutDashboard"),
 * or legacy prefixed ("IconLayoutDashboard") names.
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
  const { pascal, kebab } = toIconName(name);

  const [Icon, setIcon] = useState(() => iconCache.get(pascal) || null);

  useEffect(() => {
    if (Icon) return;
    loadIcon(kebab, pascal).then((resolved) => {
      if (resolved) setIcon(() => resolved);
    });
  }, [pascal, kebab, Icon]);

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
