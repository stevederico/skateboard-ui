import React from "react";
import * as LucideIcons from "lucide-react";

/**
 * Render a Lucide icon by name string.
 *
 * Accepts kebab-case, snake_case, or PascalCase icon names and resolves
 * them to the matching lucide-react component.
 *
 * @param {Object} props
 * @param {string} props.name - Icon name (e.g. "home", "arrow-right", "Settings")
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {string} [props.color='currentColor'] - Icon stroke color
 * @param {number} [props.strokeWidth=2] - Stroke width
 * @returns {JSX.Element|null} Rendered icon or null if name not found
 *
 * @example
 * import DynamicIcon from '@stevederico/skateboard-ui/DynamicIcon';
 *
 * <DynamicIcon name="home" size={24} />
 * <DynamicIcon name="arrow-right" size={20} color="red" />
 */
const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};

export default DynamicIcon;