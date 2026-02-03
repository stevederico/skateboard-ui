import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "./shadcn/lib/utils.js";

/**
 * Render a Lucide icon by name string.
 *
 * Accepts kebab-case, snake_case, or PascalCase icon names and resolves
 * them to the matching lucide-react component. Supports className merging
 * via shadcn cn() utility.
 *
 * @param {Object} props
 * @param {string} props.name - Icon name (e.g. "home", "arrow-right", "Settings")
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {string} [props.color='currentColor'] - Icon stroke color
 * @param {number} [props.strokeWidth=2] - Stroke width
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element|null} Rendered icon or null if name not found
 *
 * @example
 * import DynamicIcon from '@stevederico/skateboard-ui/DynamicIcon';
 *
 * <DynamicIcon name="home" size={24} />
 * <DynamicIcon name="arrow-right" size={20} color="red" />
 * <DynamicIcon name="settings" className="text-muted-foreground" />
 */
function toPascalCase(str) {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function resolveIcon(name) {
  const candidates = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  for (const candidate of candidates) {
    if (LucideIcons[candidate]) return LucideIcons[candidate];
  }
  return null;
}

const DynamicIcon = ({ name, size = 24, color = "currentColor", strokeWidth = 2, className, ...props }) => {
  const Icon = resolveIcon(name);
  if (!Icon) return null;
  return <Icon size={size} color={color} strokeWidth={strokeWidth} className={cn(className)} {...props} />;
};

export default DynamicIcon;
