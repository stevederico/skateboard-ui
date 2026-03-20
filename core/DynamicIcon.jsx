import * as LucideIcons from "lucide-react";

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
  const pascal = /[-_\s]/.test(stripped) ? toPascalCase(stripped) : stripped.charAt(0).toUpperCase() + stripped.slice(1);
  const kebab = toKebabCase(pascal);
  return { pascal, kebab };
}

/**
 * Check if a name string can be resolved to a valid Lucide icon.
 *
 * @param {string} name - Icon name to check
 * @returns {boolean} True if icon exists in the Lucide library
 */
export function canResolveIcon(name) {
  const { pascal } = toIconName(name);
  const icon = LucideIcons[pascal];
  return !!icon && (typeof icon === "function" || typeof icon?.render === "function");
}

/**
 * Render a Lucide icon by name string using a static import of all icons.
 *
 * All icons are bundled at build time from lucide-react, ensuring they work
 * in both Vite dev mode and production builds. Icons are looked up synchronously
 * by PascalCase name from the LucideIcons namespace.
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
 * @returns {JSX.Element|null} Rendered icon or null if not found
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
  const { pascal } = toIconName(name);
  const Icon = LucideIcons[pascal];

  if (!Icon || (typeof Icon !== "function" && typeof Icon?.render !== "function")) return null;

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
